exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Query: {
      debugVars: {
        type: `JSON`,
        resolve: () => {
          return process.env;
        },
      },
    },
  });
};
