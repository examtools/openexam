import { describe, expect, it } from "vitest";

import type { RichBlock } from "@/lib/exam/types";

function hasImage(blocks: RichBlock[]) {
  return blocks.some((block) => block.type === "image");
}

describe("normalize helpers", () => {
  it("detects image blocks", () => {
    const blocks: RichBlock[] = [
      { type: "text", text: "Hello" },
      { type: "image", src: "/images/questions/test.png", alt: "test" },
    ];

    expect(hasImage(blocks)).toBe(true);
  });
});
