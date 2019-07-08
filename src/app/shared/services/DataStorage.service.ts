const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
const LocalStorage = require('lowdb/adapters/LocalStorage');

export class DatabaseStorageService {
  public static db: any;

  public static async initialize() {
    //const dbPath = baseDir + '/db.json';
    //const adapter = new FileSync(dbPath);
    const adapter = new LocalStorage('localdb');
    DatabaseStorageService.db = low(adapter);

    // Set some defaults (required if your JSON file is empty)
    DatabaseStorageService.db
      .defaults({
        manage: {
          menu: [
            {
              value: 1,
              label: 'user_id'
            },
            {
              value: 2,
              label: 'item_id'
            },
            {
              value: 3,
              label: 'user_email'
            },
            {
              value: 4,
              label: 'item_views'
            },
            {
              value: 5,
              label: 'item_favorites'
            }
          ],
          description: [
            {
              id: 1,
              keyName: 'user_id',
              description:
                'Contains the primary key used to identify a user of the sytem',
              type: 1,
              isPersonalData: true,
              possibleValues: [
                {
                  id: 0,
                  value: 'null',
                  description: 'Value when user is not found',
                  isDefault: true
                },
                {
                  id: 1,
                  value: 'integer',
                  description: 'ID key of user',
                  isDefault: true
                }
              ]
            },
            {
              id: 2,
              keyName: 'item_id',
              description:
                'Contains the item_id used to identify a user of the sytem',
              type: 1,
              isPersonalData: false,
              possibleValues: [
                {
                  id: 0,
                  value: 'null',
                  description: 'Value when user is not found',
                  isDefault: true
                },
                {
                  id: 1,
                  value: 'integer',
                  description: 'ID key of user',
                  isDefault: true
                }
              ]
            },
            {
              id: 3,
              keyName: 'user_email',
              description:
                'Contains the user email used to identify a user of the sytem',
              type: 1,
              isPersonalData: true,
              possibleValues: [
                {
                  id: 0,
                  value: 'null',
                  description: 'Value when user is not found',
                  isDefault: true
                },
                {
                  id: 1,
                  value: 'string',
                  description: 'email of user',
                  isDefault: true
                }
              ]
            },
            {
              id: 4,
              keyName: 'item_views',
              description:
                'Contains the item views used to identify a user of the sytem',
              type: 1,
              isPersonalData: true,
              possibleValues: [
                {
                  id: 0,
                  value: 'null',
                  description: 'Value when user is not found',
                  isDefault: true
                },
                {
                  id: 1,
                  value: 'integer',
                  description: 'ID key of user',
                  isDefault: true
                }
              ]
            },
            {
              id: 5,
              keyName: 'item_favorites',
              description:
                'Contains the item favorites used to identify a user of the sytem',
              type: 1,
              isPersonalData: true,
              possibleValues: [
                {
                  id: 0,
                  value: 'null',
                  description: 'Value when user is not found',
                  isDefault: true
                },
                {
                  id: 1,
                  value: 'integer',
                  description: 'ID key of user',
                  isDefault: true
                }
              ]
            }
          ]
        },
        requests: [
          {
            id: 1,
            date: '2017/09/21',
            reason: 'Data science algorithms',
            status: 'pending'
          },
          {
            id: 2,
            date: '2017/08/13',
            reason: 'Stakeholder dashboards',
            status: 'approved'
          },
          {
            id: 3,
            date: '2017/07/03',
            reason: 'Email Blast',
            status: 'denied'
          },
          {
            id: 4,
            date: '2017/02/09',
            reason: 'Investigation',
            status: 'approved'
          },
          {
            id: 5,
            date: '2017/09/21',
            reason: 'Data science algorithms',
            status: 'pending'
          },
          {
            id: 6,
            date: '2017/08/13',
            reason: 'Stakeholder dashboards',
            status: 'approved'
          },
          {
            id: 7,
            date: '2017/07/03',
            reason: 'Email Blast',
            status: 'denied'
          },
          {
            id: 8,
            date: '2017/02/09',
            reason: 'Investigation',
            status: 'approved'
          },
          {
            id: 9,
            date: '2017/09/21',
            reason: 'Data science algorithms',
            status: 'pending'
          },
          {
            id: 10,
            date: '2017/08/13',
            reason: 'Stakeholder dashboards',
            status: 'approved'
          },
          {
            id: 11,
            date: '2017/07/03',
            reason: 'Email Blast',
            status: 'denied'
          },
          {
            id: 12,
            date: '2017/02/09',
            reason: 'Investigation',
            status: 'approved'
          }
        ]
      })
      .write();
  }

  public static getTableDataBy(tableName: string, getBy: any): any {
    return this.db
      .get(tableName)
      .find(getBy)
      .value();
  }

  public static getTableData(tableName: string): any {
    return this.db.get(tableName).value();
  }

  public static update(tableName: string, condition: any, newData: any): any {
    return this.db
      .get(tableName)
      .find(condition)
      .assign(newData)
      .write();
  }
}
