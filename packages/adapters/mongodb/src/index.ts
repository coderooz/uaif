import { MongoClient, type Db, type Collection, type Document } from 'mongodb';
import type {
  DatabaseContract,
  QueryFilter,
  QueryOptions,
  DBDocument,
  QueryResult,
  ContractMetadata,
} from '@uaif/core';

export interface MongoDBAdapterConfig {
  connectionString: string;
  database: string;
  collection: string;
}

export class MongoDBAdapter<TDocument extends DBDocument = DBDocument> implements DatabaseContract<TDocument> {
  readonly metadata: ContractMetadata = {
    id: 'mongodb',
    version: '0.1.0',
    segment: 'database',
    description: 'MongoDB database adapter for UAIF',
    contexts: ['server-component', 'route-handler', 'server-action'],
  };

  readonly portable = true;

  private config: MongoDBAdapterConfig;
  private client: MongoClient | null = null;
  private db: Db | null = null;

  constructor(config: MongoDBAdapterConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    this.client = new MongoClient(this.config.connectionString);
    await this.client.connect();
    this.db = this.client.db(this.config.database);
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }

  private getCollection(): Collection<Document> {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db.collection(this.config.collection);
  }

  async find(query?: QueryOptions): Promise<QueryResult<TDocument>> {
    const coll = this.getCollection();
    const filter = query?.filters ? this.convertFilters(query.filters) : {};

    let cursor = coll.find(filter);

    if (query?.sort) {
      const sortObj: Record<string, 1 | -1> = {};
      for (const s of query.sort) {
        sortObj[s.field] = s.direction === 'asc' ? 1 : -1;
      }
      cursor = cursor.sort(sortObj);
    }

    if (query?.skip) {
      cursor = cursor.skip(query.skip);
    }

    if (query?.limit) {
      cursor = cursor.limit(query.limit);
    }

    if (query?.select) {
      const projection: Record<string, 1> = {};
      for (const field of query.select) {
        projection[field] = 1;
      }
      cursor = cursor.project(projection);
    }

    const items = await cursor.toArray() as unknown as TDocument[];
    const total = await coll.countDocuments(filter);

    return {
      items,
      total,
      hasMore: query?.limit ? items.length < total : false,
    };
  }

  async findById(id: string): Promise<TDocument | null> {
    const coll = this.getCollection();
    const result = await coll.findOne({ _id: id } as Document);
    return result as TDocument | null;
  }

  async findOne(filter: QueryFilter[]): Promise<TDocument | null> {
    const coll = this.getCollection();
    const mongoFilter = this.convertFilters(filter);
    const result = await coll.findOne(mongoFilter);
    return result as TDocument | null;
  }

  async create(data: Partial<TDocument>): Promise<TDocument> {
    const coll = this.getCollection();
    const now = new Date();
    const doc = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    const result = await coll.insertOne(doc as Document);
    return { ...doc, id: result.insertedId.toString() } as TDocument;
  }

  async update(id: string, data: Partial<TDocument>): Promise<TDocument> {
    const coll = this.getCollection();
    const result = await coll.findOneAndUpdate(
      { _id: id } as Document,
      { $set: { ...data, updatedAt: new Date() } as Document },
      { returnDocument: 'after' }
    );

    if (!result) {
      throw new Error(`Document with id ${id} not found`);
    }

    return result as unknown as TDocument;
  }

  async delete(id: string): Promise<boolean> {
    const coll = this.getCollection();
    const result = await coll.deleteOne({ _id: id } as Document);
    return result.deletedCount > 0;
  }

  async count(filter?: QueryFilter[]): Promise<number> {
    const coll = this.getCollection();
    const mongoFilter = filter ? this.convertFilters(filter) : {};
    return coll.countDocuments(mongoFilter);
  }

  private convertFilters(filters: QueryFilter[]): Document {
    const and: Document[] = [];

    for (const f of filters) {
      const { field, operator, value } = f;

      switch (operator) {
        case 'eq':
          and.push({ [field]: value });
          break;
        case 'neq':
          and.push({ [field]: { $ne: value } });
          break;
        case 'gt':
          and.push({ [field]: { $gt: value } });
          break;
        case 'gte':
          and.push({ [field]: { $gte: value } });
          break;
        case 'lt':
          and.push({ [field]: { $lt: value } });
          break;
        case 'lte':
          and.push({ [field]: { $lte: value } });
          break;
        case 'in':
          and.push({ [field]: { $in: value } });
          break;
        case 'nin':
          and.push({ [field]: { $nin: value } });
          break;
        case 'contains':
          and.push({ [field]: { $regex: value, $options: 'i' } });
          break;
        case 'startsWith':
          and.push({ [field]: { $regex: `^${value}`, $options: 'i' } });
          break;
        case 'endsWith':
          and.push({ [field]: { $regex: `${value}$`, $options: 'i' } });
          break;
      }
    }

    return and.length > 0 ? { $and: and } : {};
  }
}

export function createMongoDBAdapter<TDocument extends DBDocument = DBDocument>(
  config: MongoDBAdapterConfig
): MongoDBAdapter<TDocument> {
  return new MongoDBAdapter<TDocument>(config);
}
