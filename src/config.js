const dev = {
  url: "vwwfgua8k2",
  environment: "dev"
};

const prod = {
  url: "nnzw0f4u3h",
  environment: "prod"
};

const config = process.env.NODE_ENV === "production" ? prod : dev;
export default {
    ...config
};
