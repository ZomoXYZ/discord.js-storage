export type JSONDataTypes = string | number | boolean
export type JSONObject<Value = JSONDataTypes, Key extends string = string> = {
    [key in Key]: Value
}

export function defaultJson<T>(data: any, defaultValue: T): T {
    defaultValue = structuredClone(defaultValue)
    if (typeof data !== 'object') {
        return defaultValue
    }

    for (let key in defaultValue) {
        if (!(key in data) || typeof data[key] !== typeof defaultValue[key]) {
            //key doesnt exist OR key exists, but type is incorrect
            data[key] = defaultValue[key]
        }
    }

    return data as T
}

export function defaultJsonString(
    data: string,
    defaultValue: string | JSONObject = ''
): string {
    defaultValue = structuredClone(defaultValue)
    if (data.length === 0) {
        //no existing data, give the default value instead

        if (typeof defaultValue === 'string') {
            return defaultValue
        } else {
            return JSON.stringify(defaultValue)
        }
    } else if (typeof defaultValue !== 'string') {
        //existing data should be compared
        //nothing to compare if default value is string

        try {
            let foundJson = JSON.parse(data)

            foundJson = defaultJson(foundJson, defaultValue)

            return JSON.stringify(foundJson)
        } catch (e) {
            //couldn't parse data
            return JSON.stringify(defaultValue)
        }
    }

    return data
}
