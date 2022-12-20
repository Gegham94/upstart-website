// TODO: Make this immutable, because now objectList elements changing directly
export class DeepSearchHelper {
  public static search<T>(objectList: T[], searchTerm: string): T[] {
    return !!searchTerm
      ? objectList.filter((obj): boolean => {
          let foundTerm = false;
          const keys = Object.keys(obj);

          for (const key of keys) {
            let el = (obj as unknown as { [key: string]: unknown })[key];
            if (!Array.isArray(el)) {
              if (String(el).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                foundTerm = true;
                break;
              }
            } else {
              (obj as unknown as { [key: string]: unknown })[key] = DeepSearchHelper.search<T>(
                el as unknown as T[],
                searchTerm,
              );

              el = (obj as unknown as { [key: string]: unknown })[key];

              foundTerm = (el as T[]).length > 0;
            }
          }

          return foundTerm;
        })
      : [];
  }

  public static findFirstObject<T>(
    objectList: T[],
    searchTerm: string,
    fullMatch?: boolean,
    searchKey?: string,
  ): T | null {
    let result: T | null = null;
    for (const obj of objectList) {
      const keys = Object.keys(obj);

      for (const key of keys) {
        if (Array.isArray((obj as unknown as { [key: string]: unknown })[key])) {
          result = DeepSearchHelper.findFirstObject(
            (obj as unknown as { [key: string]: unknown })[key] as T[],
            searchTerm,
            fullMatch,
            searchKey,
          );

          if (result) {
            break;
          }
        } else {
          if (
            (searchKey ? key === searchKey : true) &&
            (!!fullMatch
              ? String((obj as unknown as { [key: string]: unknown })[key]).toLowerCase() ===
                searchTerm.toLowerCase()
              : String((obj as unknown as { [key: string]: unknown })[key])
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()))
          ) {
            result = obj;

            if (result) {
              break;
            }
          }
        }
      }

      if (result) {
        break;
      }
    }
    return result;
  }
}
