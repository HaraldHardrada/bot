class ArrayFilter {
    filterRequest(request, array) {
        return request.data.filter((item) => array.includes(item.asset_id))
            .map((item) => `${item.asset_id}: ${item.price_usd.toFixed(4)} usd`)
            .join("\n")
    }

    //TODO: - добавить кнопку next
    createButtons(array, quanInRow, next = 'next', back = 'back') {
        const copy = Array.from(array)

        return copy.reduce(
            (a, c, i) => {
                i > 0 && i % quanInRow === 0 && a.push([]);
                a.at(-1).push(c);

                return a;
            },
            [[]]
        );
    }
}

module.exports = new ArrayFilter()