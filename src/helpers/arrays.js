const filterRequest = (request, array) => {
    console.log(array)
    return request.data.filter((item) => array.includes(item.asset_id))
        .map((item) => `${item.asset_id}: ${item.price_usd.toFixed(4)} usd`)
        .join("\n")
}

module.exports = {filterRequest}