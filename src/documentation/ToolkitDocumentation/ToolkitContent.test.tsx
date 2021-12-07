import { render } from "@testing-library/react";
import { ToolkitPortableText } from "./model";
import ToolkitContent from "./ToolkitContent";

describe("ToolkitContent", () => {
  it("renders external links", () => {
    const content: ToolkitPortableText = [
      {
        _key: "aa98d45c4830",
        _type: "block",
        children: [
          {
            _key: "5a0241bfeeae",
            _type: "span",
            marks: ["077a4155134d"],
            text: "Read more about ASCII",
          },
          {
            _key: "9288bd174f02",
            _type: "span",
            marks: [],
            text: ".",
          },
        ],
        markDefs: [
          {
            _type: "link",
            _key: "077a4155134d",
            href: "https://www.bbc.co.uk/bitesize/guides/zscvxfr/revision/4",
          },
        ],
        style: "normal",
      },
    ];
    const rendered = render(<ToolkitContent content={content} />);
    expect(rendered.container.innerHTML).toMatchInlineSnapshot(
      `"<p><a target=\\"_blank\\" rel=\\"nofollow noopener\\" class=\\"chakra-link css-1w3ukj\\" href=\\"https://www.bbc.co.uk/bitesize/guides/zscvxfr/revision/4\\">Read more about ASCII<svg stroke=\\"currentColor\\" fill=\\"currentColor\\" stroke-width=\\"0\\" viewBox=\\"0 0 24 24\\" focusable=\\"false\\" class=\\"chakra-icon css-wnc29g\\" height=\\"1em\\" width=\\"1em\\" xmlns=\\"http://www.w3.org/2000/svg\\"><g><path fill=\\"none\\" d=\\"M0 0h24v24H0z\\"></path><path d=\\"M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z\\"></path></g></svg></a>.</p>"`
    );
  });
});