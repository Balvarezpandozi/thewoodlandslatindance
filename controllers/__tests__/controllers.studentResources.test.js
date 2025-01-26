const {
  renderStudentResources,
  renderSalsaPlaylistInfo,
  renderBachataPlaylistInfo,
} = require("../studentResources"); // Update the path to your controller file
const ViewLocals = require("../../utils/ViewLocals"); // Mock or import as needed

describe("Student Resources Controller Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {}; // You can customize the `req` object if needed
    res = {
      render: jest.fn(), // Mock the `res.render` method
    };
  });

  test("should render the student resources page", async () => {
    await renderStudentResources(req, res);

    expect(res.render).toHaveBeenCalledWith("studentResources/index", {
      locals: expect.any(ViewLocals), // Ensure the locals is an instance of ViewLocals
    });

    const locals = res.render.mock.calls[0][1].locals;
    expect(locals.styleFiles).toEqual(["studentResources.css"]);
    expect(locals.canonicalTag).toBe("studentResources");
    expect(locals.pageTitle).toBe(
      "The Woodlands Latin Dance - Student Resources"
    );
  });

  test("should render the salsa playlist page", async () => {
    await renderSalsaPlaylistInfo(req, res);

    expect(res.render).toHaveBeenCalledWith("studentResources/salsaPlaylist", {
      locals: expect.any(ViewLocals),
    });

    const locals = res.render.mock.calls[0][1].locals;
    expect(locals.styleFiles).toEqual(["studentResources.css"]);
    expect(locals.canonicalTag).toBe("studentResources/salsaPlaylist");
    expect(locals.pageTitle).toBe("The Woodlands Latin Dance - Salsa Playlist");
  });

  test("should render the bachata playlist page", async () => {
    await renderBachataPlaylistInfo(req, res);

    expect(res.render).toHaveBeenCalledWith(
      "studentResources/bachataPlaylist",
      {
        locals: expect.any(ViewLocals),
      }
    );

    const locals = res.render.mock.calls[0][1].locals;
    expect(locals.styleFiles).toEqual(["studentResources.css"]);
    expect(locals.canonicalTag).toBe("studentResources/bachataPlaylist");
    expect(locals.pageTitle).toBe(
      "The Woodlands Latin Dance - Bachata Playlist"
    );
  });
});
