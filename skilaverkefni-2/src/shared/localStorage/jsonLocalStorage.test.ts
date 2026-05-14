import { describe, it, expect, vi, beforeEach } from "vitest";
import { readJson, writeJson } from "./jsonLocalStorage";

beforeEach(() => {
   localStorage.clear();
   vi.restoreAllMocks();
});

describe("jsonLocalStorage tests", () => {
   describe("readJson", () => {
      it("should return parsed JSON data", () => {
         localStorage.setItem(
            "test-key",
            JSON.stringify({ name: "Heiðar" }),
         );

         const result = readJson("test-key");

         expect(result).toEqual({
            name: "Heiðar",
         });
      });

      it("should return undefined when key does not exist", () => {
         const result = readJson("missing-key");

         expect(result).toBeUndefined();
      });

      it("should return undefined for invalid JSON", () => {
         localStorage.setItem(
            "bad-json",
            "{ invalid json }",
         );

         const result = readJson("bad-json");

         expect(result).toBeUndefined();
      });
   });

   describe("writeJson", () => {
      it("should write JSON string to localStorage", () => {
         writeJson("user", {
            name: "Heiðar",
         });

         const storedValue = localStorage.getItem("user");

         expect(storedValue).toBe(
            JSON.stringify({
               name: "Heiðar",
            }),
         );
      });

      it("should not throw if localStorage.setItem fails", () => {
         vi.spyOn(Storage.prototype, "setItem")
            .mockImplementation(() => {
               throw new Error("Storage failed");
            });

         expect(() => {
            writeJson("user", {
               name: "Heiðar",
            });
         }).not.toThrow();
      });
   });
});