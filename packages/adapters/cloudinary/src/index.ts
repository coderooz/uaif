import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import type {
  StorageContract,
  FileUploadInput,
  FileUploadResult,
  FileMetadata,
  ContractMetadata,
  QueryOptions,
} from '@uaif/core';

export interface CloudinaryAdapterConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder?: string;
  allowedFormats?: string[];
  maxFileSize?: number;
}

export class CloudinaryStorageAdapter implements StorageContract {
  readonly metadata: ContractMetadata = {
    id: 'cloudinary',
    version: '0.1.0',
    segment: 'storage',
    description: 'Cloudinary storage adapter for UAIF',
    contexts: ['client-component', 'server-component', 'route-handler'],
  };

  readonly portable = true;

  private config: CloudinaryAdapterConfig;

  constructor(config: CloudinaryAdapterConfig) {
    this.config = config;

    cloudinary.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
    });
  }

  async upload(input: FileUploadInput): Promise<FileUploadResult> {
    const { content, name, mimeType, folder } = input;

    const uploadOptions: Record<string, unknown> = {
      folder: folder || this.config.folder || 'uaif',
      resource_type: 'auto',
      public_id: name || undefined,
      format: mimeType.split('/')[1] || undefined,
    };

    if (this.config.allowedFormats) {
      uploadOptions.allowed_formats = this.config.allowedFormats;
    }

    if (this.config.maxFileSize) {
      uploadOptions.bytes = { max: this.config.maxFileSize };
    }

    let result: UploadApiResponse;

    if (typeof content === 'string') {
      result = await this.uploadUrl(content, uploadOptions);
    } else {
      throw new Error('Unsupported file content type. Only URL strings are supported.');
    }

    return {
      success: true,
      id: result.public_id,
      url: result.secure_url,
      metadata: {
        size: result.bytes,
        mimeType: result.format || mimeType,
        format: result.format || 'unknown',
      },
    };
  }

  async delete(fileId: string): Promise<boolean> {
    try {
      await cloudinary.uploader.destroy(fileId);
      return true;
    } catch {
      return false;
    }
  }

  async getMetadata(fileId: string): Promise<FileMetadata | null> {
    try {
      const result = await cloudinary.api.resource(fileId);

      return {
        id: result.public_id,
        name: result.original_filename || result.public_id,
        url: result.secure_url,
        mimeType: result.format || 'application/octet-stream',
        size: result.bytes,
        folder: result.folder,
        createdAt: new Date(result.created_at),
        metadata: {
          width: result.width,
          height: result.height,
          format: result.format,
          resourceType: result.resource_type,
        },
      };
    } catch {
      return null;
    }
  }

  async getUrl(fileId: string, options?: { expiry?: number }): Promise<string> {
    if (options?.expiry) {
      return cloudinary.url(fileId, {
        secure: true,
        sign_url: true,
        expires_at: Math.floor(Date.now() / 1000) + options.expiry,
      });
    }

    return cloudinary.url(fileId, { secure: true });
  }

  async list(folder?: string, options?: QueryOptions): Promise<FileMetadata[]> {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder || this.config.folder || 'uaif',
      max_results: options?.limit || 100,
    });

    return result.resources.map((resource: Record<string, unknown>) => ({
      id: resource.public_id as string,
      name: (resource.original_filename as string) || (resource.public_id as string),
      url: resource.secure_url as string,
      mimeType: (resource.format as string) || 'application/octet-stream',
      size: resource.bytes as number,
      folder: resource.folder as string,
      createdAt: new Date(resource.created_at as string),
      metadata: {
        width: resource.width,
        height: resource.height,
        format: resource.format,
        resourceType: resource.resource_type,
      },
    }));
  }

  private async uploadUrl(url: string, options: Record<string, unknown>): Promise<UploadApiResponse> {
    return cloudinary.uploader.upload(url, options as Record<string, unknown>);
  }
}

export function createCloudinaryAdapter(config: CloudinaryAdapterConfig): CloudinaryStorageAdapter {
  return new CloudinaryStorageAdapter(config);
}
