CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(20) UNIQUE NOT NULL,
  hashed_password VARCHAR NOT NULL,
  joined_on TIMESTAMP NOT NULL,
  profile_image VARCHAR,
  cart TEXT[],
  wishlist TEXT[],
  orders TEXT[]
);

CREATE TABLE orders (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_content TEXT[],
  ordered_on TIMESTAMP,
  is_delivered BOOLEAN
);

CREATE TABLE products (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  about VARCHAR NOT NULL,
  details TEXT[],
  images TEXT[]
);

CREATE TABLE reviews (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  prod_id VARCHAR REFERENCES products(id) ON DELETE CASCADE,
  user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
  body VARCHAR NOT NULL,
  rating INT
);