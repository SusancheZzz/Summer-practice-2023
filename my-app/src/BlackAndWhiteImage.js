import React from "react";

class BlackAndWhiteImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blackAndWhite: false
        };
    }

    toggleBlackAndWhite = () => {
        this.setState(prevState => ({
            blackAndWhite: !prevState.blackAndWhite
        }));
    };

    render() {
        const { src } = this.props;
        const { blackAndWhite } = this.state;

        return (
            <div>
                <img
                    src={src}
                    alt="image"
                    style={{ filter: blackAndWhite ? "grayscale(100%)" : "none" }}
                />
                <button className="apply-button" onClick={this.toggleBlackAndWhite}>
                    Convert to Black and White
                </button>
            </div>
        );
    }
}

export default BlackAndWhiteImage;