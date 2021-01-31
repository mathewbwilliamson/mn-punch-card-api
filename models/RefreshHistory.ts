// src/models/RefreshHistory.ts
import { Optional, Model, DataTypes } from 'sequelize';

export interface RefreshHistoryAttributes {
  id: number;
  errorMessage: string;
  success: string;
  asin: string;
  updatedAt: string;
  createdAt: string;
  oldRewardCardPrice: number;
  newRewardCardPrice: number;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface RefreshHistoryCreationAttributes
  extends Optional<
    RefreshHistoryAttributes,
    'id' | 'updatedAt' | 'createdAt' | 'oldRewardCardPrice'
  > {}

export class RefreshHistory
  extends Model<RefreshHistoryAttributes, RefreshHistoryCreationAttributes>
  implements RefreshHistoryAttributes {
  public errorMessage!: string;
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public asin!: string;
  public success!: string;
  public updatedAt!: string;
  public createdAt!: string;
  public newRewardCardPrice: number;
  public oldRewardCardPrice: number;
}

export const refreshHistoryInit = (sequelize: any) => {
  return RefreshHistory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      errorMessage: {
        type: DataTypes.STRING,
      },
      success: {
        type: DataTypes.STRING,
      },
      asin: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      oldRewardCardPrice: DataTypes.INTEGER,
      newRewardCardPrice: DataTypes.INTEGER,
    },
    {
      tableName: 'RefreshHistories',
      sequelize, // passing the `sequelize` instance is required
    }
  );
};
