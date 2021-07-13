export const findItemInArrayOfObject = (
    arrayOfObject: Array<Record<string, any>>,
    id: number,
    keyOfId = 'id',
  ): Record<string, any> | undefined => {
    const obj = arrayOfObject.find((x) => x[keyOfId] === id);
    return obj;
  }