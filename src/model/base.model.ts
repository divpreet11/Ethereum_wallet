import * as db from '../helpers/common/db.helper';

class BaseModel {
   public tableName: string;

   public insertion: string;

   public selectCols: string;

   public selectWhere = '';

   public offsets = 0;

   public limits = 10;

   public orderBy = '';

   public orderIs = '';

   public updation: string;

   //public fileId: any;

   public updateWhere = '';

   public deleteWhere = '';

   public insertPrimaryKey: string;

   constructor(value = '') {
      this.tableName = value;
   }

   public inserRecords(): Promise<Array<{ uuid: string }>> {
      // tslint:disable-next-line:max-line-length
      const query =
         'CALL insertData("' +
         this.tableName +
         '","' +
         this.insertion +
         '","' +
         this.insertPrimaryKey +
         '");';
      console.log(query);
      const result = db.default.pdo(query) as unknown as Promise<
         Array<{ uuid: string }>
      >;
      return result;
   }

   // public getRecords() {
   //    // tslint:disable-next-line:max-line-length
   //    const query = `CALL getFile("${this.fileId}");`;
   //    const result = db.default.pdo(query);
   //    return result;
   // }

   public deleteRecord(): boolean {
      // tslint:disable-next-line:max-line-length
      const query =
         'call deleteData("' +
         this.tableName +
         '" ,"' +
         this.deleteWhere +
         '");';
      console.log('this is delete query', query);
      const result = db.default.pdo(query);
      return Boolean(result);
   }

   public async selectRecords<T>(): Promise<T> {
      // tslint:disable-next-line:max-line-length
      const query =
         'call SelectData("' +
         this.selectCols +
         '","' +
         this.tableName +
         '","' +
         this.selectWhere +
         '",' +
         this.offsets +
         ',' +
         this.limits +
         ',"' +
         this.orderBy +
         '","' +
         this.orderIs +
         '");';
      console.log(query);
      const result = (await db.default.pdo(query)) as T;
      this.resetSelectSettings();
      return result;
   }

   public async updateRecords(): Promise<boolean> {
      // tslint:disable-next-line:max-line-length
      const query =
         'call updateData("' +
         this.tableName +
         '","' +
         this.updation +
         '","' +
         this.updateWhere +
         '");';
      console.log('\n update query: ', query);
      const result = (await db.default.pdo(
         query
      )) as unknown as Promise<boolean>;

      return result;
   }

   public async callQuery<T>(
      query: string,
      connType = 'normal',
      isAll = false
   ): Promise<T> {
      console.log('query call->', query);
      const result = await db.default.pdo(query, connType, isAll);
      this.resetSelectSettings();
      return result as T;
   }

   private resetSelectSettings() {
      this.selectWhere = '';
      this.orderBy = '';
      this.orderIs = '';
      this.selectCols = '';
      this.offsets = 0;
   }

   private resetSelectSettingsOffer() {
      this.selectWhere = '';
      this.orderBy = '';
      this.orderIs = '';
      this.selectCols = '';
      this.offsets = 0;
   }

   async startTransaction(): Promise<void> {
      await this.callQuery('START TRANSACTION;');
   }
   async commitTransaction(): Promise<void> {
      await this.callQuery('COMMIT;');
   }
   async rollbackTransaction(): Promise<void> {
      await this.callQuery('ROLLBACK;');
   }
}
export default BaseModel;
