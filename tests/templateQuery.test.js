// tests/templateQuery.test.js

// Mock the Template model so these tests do not use the real MongoDB database
jest.mock("../models/Template");

const Template = require("../models/Template");
const { getAllTemplates } = require("../controllers/templateController");

describe("Template Query Operator API Unit Tests", () => {
  let req;
  let res;
  let mockQuery;

  const mockTemplates = [
    {
      _id: "1",
      name: "Resume Template",
      category: "Resume",
      price: 15,
      isPremium: false
    },
    {
      _id: "2",
      name: "Portfolio Template",
      category: "Portfolio",
      price: 25,
      isPremium: false
    },
    {
      _id: "3",
      name: "Business Template",
      category: "Business",
      price: 40,
      isPremium: true
    }
  ];

  beforeEach(() => {
    // Mock Express response object
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Mock the Mongoose query chain
    mockQuery = {
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),

      // Allows: const templates = await query
      then: jest.fn((resolve) => resolve(mockTemplates))
    };

    Template.find.mockReturnValue(mockQuery);
    Template.countDocuments.mockResolvedValue(mockTemplates.length);

    jest.clearAllMocks();

    // Restore mocks cleared above
    Template.find.mockReturnValue(mockQuery);
    Template.countDocuments.mockResolvedValue(mockTemplates.length);
  });

  // ------------------------------------------------------
  // QUERY OPERATORS AND SELECT
  // ------------------------------------------------------

  describe("Query Operators and Select", () => {
    test("should filter templates using minPrice and maxPrice", async () => {
      req = {
        query: {
          minPrice: "20",
          maxPrice: "50"
        }
      };

      await getAllTemplates(req, res);

      expect(Template.find).toHaveBeenCalledWith({
        price: {
          $gte: 20,
          $lte: 50
        }
      });

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should exclude selected fields from returned templates", async () => {
      req = {
        query: {
          exclude: "__v,isPremium"
        }
      };

      await getAllTemplates(req, res);

      expect(mockQuery.select).toHaveBeenCalledWith(
        "-__v -isPremium"
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // ------------------------------------------------------
  // PAGINATION
  // ------------------------------------------------------

  describe("Pagination", () => {
    test("should skip the correct number of templates for page 2", async () => {
      req = {
        query: {
          page: "2",
          limit: "2"
        }
      };

      await getAllTemplates(req, res);

      // (page - 1) * limit
      // (2 - 1) * 2 = 2
      expect(mockQuery.skip).toHaveBeenCalledWith(2);

      expect(mockQuery.limit).toHaveBeenCalledWith(2);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should use the correct skip and limit for page 3", async () => {
      req = {
        query: {
          page: "3",
          limit: "5"
        }
      };

      await getAllTemplates(req, res);

      // (3 - 1) * 5 = 10
      expect(mockQuery.skip).toHaveBeenCalledWith(10);

      expect(mockQuery.limit).toHaveBeenCalledWith(5);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // ------------------------------------------------------
  // SORTING
  // ------------------------------------------------------

  describe("Sorting", () => {
    test("should sort templates by price in ascending order", async () => {
      req = {
        query: {
          sort: "price"
        }
      };

      await getAllTemplates(req, res);

      expect(mockQuery.sort).toHaveBeenCalledWith("price");

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should sort templates by price in descending order", async () => {
      req = {
        query: {
          sort: "-price"
        }
      };

      await getAllTemplates(req, res);

      expect(mockQuery.sort).toHaveBeenCalledWith("-price");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});