import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { wouldExceedDailyCap } from "./email-delivery.ts";
Deno.test("bulk cap 1000: 900+100 allowed", () => assertEquals(wouldExceedDailyCap(900, 100, 1000), false));
Deno.test("bulk cap 1000: 900+101 refused", () => assertEquals(wouldExceedDailyCap(900, 101, 1000), true));
Deno.test("round cap 500: 499+1 allowed", () => assertEquals(wouldExceedDailyCap(499, 1, 500), false));
Deno.test("round cap 500: 500+1 refused", () => assertEquals(wouldExceedDailyCap(500, 1, 500), true));
