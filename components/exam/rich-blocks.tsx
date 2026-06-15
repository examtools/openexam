import Image from "next/image";
import React from "react";

import type { RichBlock } from "@/lib/exam/types";

function renderBlocks(blocks: RichBlock[]): React.ReactNode {
  return blocks.map((block, index) => {
    if (block.type === "text") {
      return (
        <span key={`text-${index}`} className="whitespace-pre-wrap">
          {block.text}
        </span>
      );
    }

    if (block.type === "line-break") {
      return <br key={`br-${index}`} />;
    }

    if (block.type === "image") {
      return (
        <span key={`img-${index}`} className="my-3 block">
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width ?? 600}
            height={block.height ?? 360}
            className="h-auto w-full max-w-md rounded-lg border border-black/10 object-contain"
          />
        </span>
      );
    }

    if (block.type === "container") {
      const Tag = block.tag as keyof React.JSX.IntrinsicElements;
      return (
        <Tag
          key={`container-${index}`}
          className={block.className}
          style={block.style as React.CSSProperties | undefined}
        >
          {renderBlocks(block.children)}
        </Tag>
      );
    }

    return null;
  });
}

export function RichContent({ blocks }: { blocks: RichBlock[] }) {
  return <div className="space-y-2 text-sm leading-relaxed">{renderBlocks(blocks)}</div>;
}
