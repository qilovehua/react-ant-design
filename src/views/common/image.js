var React = require('react');
var _ = require('lodash');

class Image extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            src: this.props.source || '',
            url: '',
            width: null,
            height: null,
        };
    }

    componentWillMount() {
        if (this.props.guid){
            this.getImageUrl(this.props.guid);
        }
    }

    componentWillReceiveProps(props){
        if(!_.isEqual(props.guid, this.props.guid)){
            this.setState({url: ''});
            this.getImageUrl(props.guid);
        }
    }

    getImageUrl(guid){
        this.setState({
            width: 1440,
            height: 900,
            url: 'http://pic.pp3.cn/uploads//201503/2015031112.jpg',
        });
        // if(!guid){
        //     return;
        // }
        // let index = guid.indexOf(','); // user是postId,guid组成
        // if(index >= 0){
        //     guid = guid.slice(index + 1);
        // }
        // ImageModel.getImageUrl({guid}).then((result)=>{
        //     console.log("imageUrl", result);
        //     if (result.width && result.height){
        //         this.setState({
        //             width: result.width,
        //             height: result.height,
        //             url: result.url,
        //         });
        //     }else {
        //         this.setState({
        //             url: result.url,
        //         });
        //     }
        // });
    }

    componentDidMount() {
        if (this.props.resizeMode === 'cover') { //cover 布局需要判断容器宽高来布局
            var height = parseInt(window.getComputedStyle(this._container).height);
            var width = parseInt(window.getComputedStyle(this._container).width);
            this.setState({
                containerWidth: width,
                containerHeight: height
            });
        }
    }

    render() {
        var {width, height, desc} = this.state;
        var {containerWidth, containerHeight} = this.state;
        var shouldResize;
        if (containerWidth && containerHeight && width / containerWidth > height / containerHeight) {
            //图片的真实宽度比较大,导致相对高度较小,在容器中上下会有留白,所以重新定义图片的布局,让图片显示高度与容器相同
            shouldResize = true;
        }
        var imgDesc;
        if(desc){
            imgDesc = (
                <div className="image-desc">
                    <span>{desc}</span>
                </div>
            )
        }

        return (
            <div ref={(ref) => {this._container = ref}} className={`image-wrapper ${this.props.resizeMode} ${this.props.className}`}>
                <div className="image-wrapper-inner">
                    <img src={this.state.url !== '' ? this.state.url : this.state.src} className={shouldResize ? 'resize' : ''} alt="加载失败"/>
                    {imgDesc}
                </div>
            </div>
        );
    }
}

Image.defaultProps = {
    resizeMode: 'contain',
    className: ''
};

export default Image;