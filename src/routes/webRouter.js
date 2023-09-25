import HomeController from "../controllers/HomeController.js"
import UserController from "../controllers/UserController.js"
const initRouter = (app) => {
    app.get('/', HomeController.main)
    app.get('/about', HomeController.about)
    app.get('/home', HomeController.home)

    app.get('/user', UserController.user)
    app.get('/create-new-user', UserController.create)
    const UserController = (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        const from = (page - 1) * perPage + 1;
        const to = page * perPage;
        
        res.send(`Displaying users from ${from} to ${to}`);
      };
      
      // Định nghĩa tuyến đường cho /list-user và chạy qua controller
    app.get('/list-user', UserController);
    app.get("/login", UserController.login)
    const headerController = (req, res) => {
        const username = req.params.username || 'Guest';
        res.send(`
          <header>
            <h1><a href="/${encodeURIComponent(username)}">Header</a></h1>
          </header>
          <main>
            <h2>Welcome, ${username}!</h2>
          </main>
        `);
      };
      app.get('/:username', headerController);
}
export default initRouter
