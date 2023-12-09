import IProfile from './profile.interface';

export class Profile implements IProfile {
  private _name: string;
  private _description: string;
  private _briefDescription: string;
  private _birthday: Date;
  private _avatarUrl: string;
  private _backgroundImgUrl: string;
  private _created_at: Date;
  private _updated_at: Date;
  private _id?: string;

  constructor(
    name: string,
    description: string,
    briefDescription: string,
    birthday: Date,
    avatarUrl: string,
    backgroundImgUrl: string,
    id?: string,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._briefDescription = briefDescription;
    this._birthday = birthday;
    this._avatarUrl = avatarUrl;
    this._backgroundImgUrl = backgroundImgUrl;
  }

  get id(): string {
    return this._id;
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
}
