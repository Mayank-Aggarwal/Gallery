const createActionTypes = (prefix, actionTypeList) => {
    const actionTypesObject = actionTypeList.reduce((acc, item) => {
        acc[item] = `${prefix}/${item}`
        return acc;
    }, {})

    return actionTypesObject
}

export default createActionTypes