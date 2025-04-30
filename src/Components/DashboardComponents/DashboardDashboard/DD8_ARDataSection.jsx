import React, { useState } from "react";
import qrcode from "../../../assets/dashboardIMG/ar-code.png";

const DD_8ARDataSection = () => {
    const [text, setText] = useState("AR Code Magic");
    const [textSize, setTextSize] = useState(1);
    const [bgHeight, setBgHeight] = useState(100);
    const [bgWidth, setBgWidth] = useState(200);
    const [textColor, setTextColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");

    return (
        <div className="row custom-row">
            {/* Input Section */}
            <div className="col-md-6 custom-col">
                <div className="mb-3">
                    <label htmlFor="textInput" className="form-label">
                        Your Text
                    </label>
                    <input
                        type="text"
                        id="textInput"
                        className="form-control"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="textSizeRange" className="form-label">
                        Text Size: {textSize}
                    </label>
                    <input
                        type="range"
                        id="textSizeRange"
                        className="form-range"
                        min="1"
                        max="30"
                        value={textSize}
                        onChange={(e) => setTextSize(Number(e.target.value))}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="bgHeightRange" className="form-label">
                        Text Background Height: {bgHeight}px
                    </label>
                    <input
                        type="range"
                        id="bgHeightRange"
                        className="form-range"
                        min="50"
                        max="300"
                        value={bgHeight}
                        onChange={(e) => setBgHeight(Number(e.target.value))}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="bgWidthRange" className="form-label">
                        Text Background Width: {bgWidth}px
                    </label>
                    <input
                        type="range"
                        id="bgWidthRange"
                        className="form-range"
                        min="50"
                        max="300"
                        value={bgWidth}
                        onChange={(e) => setBgWidth(Number(e.target.value))}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="textColorPicker" className="form-label">
                        Text Color
                    </label>
                    <input
                        type="color"
                        id="textColorPicker"
                        className="form-control form-control-color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="bgColorPicker" className="form-label">
                        Text Background Color
                    </label>
                    <input
                        type="color"
                        id="bgColorPicker"
                        className="form-control form-control-color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                    />
                </div>
            </div>

            {/* Result Section */}
            <div className="col-md-6 custom-col d-flex justify-content-center align-items-center">
                {/* Background Image Container */}
                <div
                    className="background-image-container"
                    style={{
                        backgroundImage: `url(${qrcode})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "300px",
                        width: "300px",
                        position: "relative",
                    }}
                >
                    {/* Text Container */}
                    <div
                        className="text-container"
                        style={{
                            backgroundColor: bgColor,
                            width: `${bgWidth}px`,
                            height: `${bgHeight}px`,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                color: textColor,
                                fontSize: `${textSize * 10}px`,
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                            }}
                        >
                            {text}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DD_8ARDataSection;
