import React from 'react';
import _ from 'lodash';
import * as d3 from "d3";

import Characters from './visualizations/Characters';
import Themes from './visualizations/Themes';

import charList from './data/char_list.json';
import chroma from 'chroma-js';
var Remarkable = require('remarkable');
var md = new Remarkable({linkTarget: '_new', html: true});

var playing = null;

var Section = React.createClass({
  shouldComponentUpdate(nextProps) {
    return !!nextProps.update;
  },

  componentDidMount() {
    this.container = d3.select(this.refs.section);
    this.currentTime = 0;
    this.duration = 0;
    this.clip = null;

    this.clips = _.map(this.props.clips, clip => {
      return {
        url: process.env.PUBLIC_URL + clip[0],
        lineIds: clip[1],
      };
    });
    this.audio = new Audio();
    this.audio.addEventListener('play', this.playMusic);

    this.processMusic();
    this.setPlay();
    this.processReset();

  },

  playMusic() {
    var intervalId = setInterval(() => {
      this.duration = this.audio.duration;
      if (!this.duration) return;

      if (this.audio.currentTime) {
        this.currentTime = this.audio.currentTime;
        // set linear gradient
        if (!this.clip) return;
        var color = this.clip.background;
        var percent = this.currentTime / this.duration * 100;
        d3.select(this.clip.element)
          .style('background', 'linear-gradient(to right,' +
            color + ' ' + percent + '%,' +
            chroma(color).alpha(0.5).css() + ' ' + (percent + 0.5) + '%)');

        // highlight the right line being played
        this.props.playLines({
          lineIds: this.clip.lineIds,
          currentTime: this.currentTime,
          duration: this.duration,
        });
      }

      // if it's still playing, and current time is less than duration
      // then call this function again
      if (this.currentTime === this.duration) {
        this.currentTime = 0;
        playing = null;
        this.duration = 0;
        this.clip = null;
      }
      if (!playing) {
        this.setPlay();
        this.props.playLines(null);
        clearInterval(intervalId);
      }
    }, 50);
  },

  processMusic() {
    // use this section to post-process for music
    var color = this.props.fontColor;
    var that = this;

    this.container.selectAll('.music')
      .each(function() {
        var character = d3.select(this).attr('data-char');
        var background = charList[character][4];
        if (chroma.contrast(background, color) < 4.5) {
          // if the contrast isn't enough, make the color white isntead
          color = '#fff';
        }
        d3.select(this)
          .style('background', background)
          .style('color', color);

        var clipIndex = d3.select(this).attr('data-clip');
        that.clips[clipIndex].background = background;
        that.clips[clipIndex].element = this;

      }).on('click', function() {
        // if something is currently playing
        if (playing) {
          // is it the same thing as we just clicked?
          if (playing === that.audio) {
            // then pause
            that.audio.pause();
            playing = null;
            that.setPlay();
            return;
          }
          // if it's not the same, stop the previous
          playing.pause();
        }
        // and then play the new one
        var clipIndex = d3.select(this).attr('data-clip');
        that.clip = that.clips[clipIndex];

        that.audio.setAttribute('src', that.clip.url);
        that.audio.load();

        that.audio.currentTime = that.currentTime;
        that.audio.play();
        playing = that.audio;

        d3.select(this).select('.control')
          .html('&nbsp; &#10073; &#10073; &nbsp;');
      });
  },

  setPlay() {
    this.container.selectAll('.control')
      .html('&nbsp; ▶ &nbsp;');
  },

  processReset() {
    this.container.selectAll('.reset')
      .on('click', this.props.resetFilters)
  },

  render() {
    var padding = 20;
    var style = Object.assign({
      width: this.props.sectionWidth - 2 * padding,
      lineHeight: 2,
      pointerEvents: 'none',
      color: this.props.fontColor,
      padding,
    }, this.props.style);
    var contentStyle = Object.assign({
      paddingBottom: padding,
    }, this.props.contentStyle);
    var rawMarkup = { __html: md.render(this.props.text)};

    var characters, themes;
    if (this.props.filter === 'characters' || this.props.filter === 'all') {
      characters = (<Characters {...this.props} />);
    }
    if (this.props.filter === 'themes' || this.props.filter === 'all') {
      themes = (<Themes {...this.props} />);
    }

    return (
      <div style={style} className='section' id={this.props.id}>
        <div style={contentStyle} ref='section' dangerouslySetInnerHTML={rawMarkup} />
        {themes}
        {characters}
      </div>
    );
  }
});

export default Section;
