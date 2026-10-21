import type mongoose from "mongoose";

export class ApiFeatures {
  constructor(
    public mongooseQuery: mongoose.Query<any, any>,
    public queryString: Record<string, any>,
  ) {}

  public filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["limit", "skip", "select", "filter"];
    excludedFields.forEach((field) => delete queryObj[field]);

    Object.keys(queryObj).forEach((key) => {
      const parts = /^(\w+)(\[(gte|gt|lte|lt|in)\])?$/.exec(key);
      if (parts) {
        const field = parts[1];
        const operator = parts[3];
        if (field && operator) {
          this.mongooseQuery = this.mongooseQuery.find({
            [field]: { ["$" + operator]: queryObj[key] },
          });
        } else if (field) {
          this.mongooseQuery = this.mongooseQuery.find({
            [field]: queryObj[key],
          });
        }
      }
    });

    return this;
  }

  public limit(_limit?: number) {
    if (_limit) {
      this.mongooseQuery = this.mongooseQuery.limit(Number(_limit));
    } else if (this.queryString.limit) {
      this.mongooseQuery = this.mongooseQuery.limit(
        Number(this.queryString.limit),
      );
    }
    return this;
  }

  public skip(_skip?: number) {
    if (_skip) {
      this.mongooseQuery = this.mongooseQuery.skip(Number(_skip));
    } else if (this.queryString.skip) {
      this.mongooseQuery = this.mongooseQuery.skip(
        Number(this.queryString.skip),
      );
    }
    return this;
  }

  public select() {
    if (this.queryString.select) {
      this.mongooseQuery = this.mongooseQuery.select(this.queryString.select);
    }
    return this;
  }
}
