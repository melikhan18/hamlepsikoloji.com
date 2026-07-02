import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — erik zeminde kayısı noktalı "H" monogramı.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#352a44",
          color: "#faf2ea",
          fontSize: 116,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        H
        <span
          style={{
            position: "absolute",
            right: 44,
            bottom: 44,
            width: 16,
            height: 16,
            borderRadius: 16,
            background: "#e89a5c",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
