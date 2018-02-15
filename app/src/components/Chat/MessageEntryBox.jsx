/*
@todo: Rewrite this completely  new
 */
import React, { Component, PropTypes } from 'react';
import emojione from 'emojione';
/*
import EmojiPicker from '../../emojipicker/picker.jsx';
*/

export default class MessageEntryBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emojiPickerClass: 'emoji-out',
            msgText: '',
            caretPosition: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isPosting && !nextProps.isPosting) {
            this.refs.message.innerHTML = '';
        }
    }

    addMessage() {
        const text = this.refs.message.innerHTML.trim();
        if (this.props.currentUser.username) {
            const message = {
                username: this.props.currentUser.username,
                text
            };
            this.props.onAddMessage(message);
        }
    }

    getCharacterOffsetWithin(range, node) {
        const treeWalker = document.createTreeWalker(
            node,
            NodeFilter.SHOW_TEXT,
            (node) => {
                const nodeRange = document.createRange();
                nodeRange.selectNodeContents(node);
                return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
                    NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            },
            false
        );

        let charCount = 0;
        while (treeWalker.nextNode()) {
            charCount += treeWalker.currentNode.length;
        }
        if (range.startContainer.nodeType === 3) {
            charCount += range.startOffset;
        }
        return charCount;
    }

    getCaretPosition(event) {
        const range = window.getSelection().getRangeAt(0);
        const charCount = this.getCharacterOffsetWithin(range, event.target);
        this.setState({
            caretPosition: charCount
        });
    }

    addEmoji(data) {
        //  debugger;
        const img = emojione.shortnameToImage(data.shortname);
        $(this.refs.message).append(img);
        /*
          let msgContent = $(this.refs.message).html();
          let position = this.state.caretPosition;
          $(this.refs.message).html([msgContent.slice(0, position), img, msgContent.slice(position)].join(''));
        */

        this.setState({
            emojiPickerClass: 'emoji-out'
        });
    }

    openEmojiDialog() {
        if (this.state.emojiPickerClass === 'emoji-out') {
            this.setState({
                emojiPickerClass: 'emoji-in'
            });
        } else {
            this.setState({
                emojiPickerClass: 'emoji-out'
            });
        }
    }

    createMarkup() {
        const rawMarkup = this.state.msgText;
        return { __html: rawMarkup };
    }

    render() {
        const { isPosting } = this.props;
        return (
            <div className="chat-entry-area">
                <div className="message-entry-box row">
                    <div className="chat-textwrapper small-12 medium-12 column">
                        <div className="chat-textarea"
                             contentEditable={true}
                             id="kickbookMessageInput"
                             dangerouslySetInnerHTML={this.createMarkup()}
                             ref="message">
                        </div>
                        <div className="chat-emoji-button" onClick={this.openEmojiDialog.bind(this)}></div>
                        <button
                            className="chat-send-button button "
                            onClick={event => this.addMessage(event)}
                            disabled={isPosting}>
                            Senden
                        </button>
                    </div>
                </div>
                {/*
                    <div className={`emoji-wrapper ${this.state.emojiPickerClass}`}>
                        <EmojiPicker onChange={data => this.addEmoji(data)}/>
                    </div>
                */}
            </div>
        );
    }
}

MessageEntryBox.propTypes = {
    currentUser: PropTypes.object.isRequired,
    onAddMessage: PropTypes.func.isRequired,
    isPosting: PropTypes.bool.isRequired
};
