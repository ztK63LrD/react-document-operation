// 数据结构转换

// 数组转对象
export const mapArr = (arr) => {
    return arr.reduce((map, item) => {
        map[item.id] = item
        return map
    }, {})
}
// 对象转数组
export const objToArr = (obj) => {
    return Object.keys(obj).map((key) => obj[key])
}