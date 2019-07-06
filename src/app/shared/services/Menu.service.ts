import { DatabaseStorageService } from './DataStorage.service';

export class MenuService {
  private static instance: MenuService;
  public static getInstance() {
    if (!MenuService.instance) {
      MenuService.instance = new MenuService();
    }
    return MenuService.instance;
  }

  public getMenuData = async (): Promise<any> => {
    try {
      if (!DatabaseStorageService.db) {
        DatabaseStorageService.initialize();
      }
      const data = DatabaseStorageService.getTableData('manage.menu');
      return {
        data
      };
    } catch (e) {
      console.log(e);
    }
  };
}
