import ICharacter from './character.interface';
import { v4 as uuid } from 'uuid';

export class Character implements ICharacter {
  private _id: string;
  private _userId: string;
  private _nick: string;
  private _name: string;
  private _exp: number;
  private _description: string;
  private _briefDescription: string;
  private _birthday: Date;
  private _avatarUrl: string;
  private _backgroundImgUrl: string;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(
    userId: string,
    nick: string,
    name: string,
    description: string,
    briefDescription: string,
    birthday: Date,
    avatarUrl: string,
    backgroundImgUrl: string,
    id?: string,
    exp?: number,
  ) {
    this._id = id;
    this._userId = userId;
    this._nick = nick;
    this._name = name;
    this._exp = exp ?? 0;
    this._description = description;
    this._briefDescription = briefDescription;
    this._birthday = birthday;
    this._avatarUrl = avatarUrl;
    this._backgroundImgUrl = backgroundImgUrl;
  }

  get id(): string {
    return this._id;
  }
  get userId(): string {
    return this._userId;
  }
  get exp(): number {
    return this._exp;
  }
  get nick(): string {
    return this._nick;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get briefDescription(): string {
    return this._briefDescription;
  }
  get birthday(): Date {
    return this._birthday;
  }
  get avatarUrl(): string {
    return this._avatarUrl;
  }
  get backgroundImgUrl(): string {
    return this._backgroundImgUrl;
  }
  get created_at(): Date {
    return this._created_at;
  }
  get updated_at(): Date {
    return this._updated_at;
  }

  attributeTest(): number {
    const hash = uuid();
    const numeros = uuid.replace(/\D/g, '');
    return numeros;
  };
}
