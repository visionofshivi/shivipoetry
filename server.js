const {app} = require('./src/router');

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is listening on ${port}`));
