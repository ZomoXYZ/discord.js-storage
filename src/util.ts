export type JSONDataTypes = string | number | boolean
export type JSONObject<Value = JSONDataTypes, Key extends string = string> = {
    [key in Key]: Value
}
