create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    telegram_id BIGINT UNIQUE
);

create TABLE currencies(
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(255),
    user_id BIGINT REFERENCES person (telegram_id)
);
