class ArrayFilter {
    filterRequest(request, array) {
        return request.data.filter((item) => array.includes(item.asset_id))
            .map((item) => `${item.asset_id}: ${item.price_usd.toFixed(4)} usd`)
            .join("\n")
    }

    //TODO: - добавить кнопку next
    createButtons(array, quanInRow, next = 'next', back = 'back') {
        const copy = Array.from(array)

        if (next) copy.push(next);
        if (back) copy.push(back);

        return copy.reduce((acc, curr, i) => {
            if (i === 0) {
                acc.push([curr]);
                return acc;
            }

            if (i % quanInRow === 0) {
                acc.push([]);
                acc.at(-1).push(curr);

                return acc;
            }

            acc.at(-1).push(curr);

            return acc;
        }, []);
    }
}

module.exports = new ArrayFilter()