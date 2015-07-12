//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Template = Package.templating.Template;
var _ = Package.underscore._;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/dbarrett:dropzonejs/lib/4.0.1/dropzone.js                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
/*                                                                                                                  // 2
 *                                                                                                                  // 3
 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)                                                     // 4
 *                                                                                                                  // 5
 * Copyright (c) 2012, Matias Meno                                                                                  // 6
 *                                                                                                                  // 7
 * Permission is hereby granted, free of charge, to any person obtaining a copy                                     // 8
 * of this software and associated documentation files (the "Software"), to deal                                    // 9
 * in the Software without restriction, including without limitation the rights                                     // 10
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell                                        // 11
 * copies of the Software, and to permit persons to whom the Software is                                            // 12
 * furnished to do so, subject to the following conditions:                                                         // 13
 *                                                                                                                  // 14
 * The above copyright notice and this permission notice shall be included in                                       // 15
 * all copies or substantial portions of the Software.                                                              // 16
 *                                                                                                                  // 17
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR                                       // 18
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,                                         // 19
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE                                      // 20
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER                                           // 21
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,                                    // 22
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN                                        // 23
 * THE SOFTWARE.                                                                                                    // 24
 *                                                                                                                  // 25
 */                                                                                                                 // 26
                                                                                                                    // 27
(function() {                                                                                                       // 28
  var Dropzone, Emitter, camelize, contentLoaded, detectVerticalSquash, drawImageIOSFix, noop, without,             // 29
    __slice = [].slice,                                                                                             // 30
    __hasProp = {}.hasOwnProperty,                                                                                  // 31
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
                                                                                                                    // 33
  noop = function() {};                                                                                             // 34
                                                                                                                    // 35
  Emitter = (function() {                                                                                           // 36
    function Emitter() {}                                                                                           // 37
                                                                                                                    // 38
    Emitter.prototype.addEventListener = Emitter.prototype.on;                                                      // 39
                                                                                                                    // 40
    Emitter.prototype.on = function(event, fn) {                                                                    // 41
      this._callbacks = this._callbacks || {};                                                                      // 42
      if (!this._callbacks[event]) {                                                                                // 43
        this._callbacks[event] = [];                                                                                // 44
      }                                                                                                             // 45
      this._callbacks[event].push(fn);                                                                              // 46
      return this;                                                                                                  // 47
    };                                                                                                              // 48
                                                                                                                    // 49
    Emitter.prototype.emit = function() {                                                                           // 50
      var args, callback, callbacks, event, _i, _len;                                                               // 51
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];                         // 52
      this._callbacks = this._callbacks || {};                                                                      // 53
      callbacks = this._callbacks[event];                                                                           // 54
      if (callbacks) {                                                                                              // 55
        for (_i = 0, _len = callbacks.length; _i < _len; _i++) {                                                    // 56
          callback = callbacks[_i];                                                                                 // 57
          callback.apply(this, args);                                                                               // 58
        }                                                                                                           // 59
      }                                                                                                             // 60
      return this;                                                                                                  // 61
    };                                                                                                              // 62
                                                                                                                    // 63
    Emitter.prototype.removeListener = Emitter.prototype.off;                                                       // 64
                                                                                                                    // 65
    Emitter.prototype.removeAllListeners = Emitter.prototype.off;                                                   // 66
                                                                                                                    // 67
    Emitter.prototype.removeEventListener = Emitter.prototype.off;                                                  // 68
                                                                                                                    // 69
    Emitter.prototype.off = function(event, fn) {                                                                   // 70
      var callback, callbacks, i, _i, _len;                                                                         // 71
      if (!this._callbacks || arguments.length === 0) {                                                             // 72
        this._callbacks = {};                                                                                       // 73
        return this;                                                                                                // 74
      }                                                                                                             // 75
      callbacks = this._callbacks[event];                                                                           // 76
      if (!callbacks) {                                                                                             // 77
        return this;                                                                                                // 78
      }                                                                                                             // 79
      if (arguments.length === 1) {                                                                                 // 80
        delete this._callbacks[event];                                                                              // 81
        return this;                                                                                                // 82
      }                                                                                                             // 83
      for (i = _i = 0, _len = callbacks.length; _i < _len; i = ++_i) {                                              // 84
        callback = callbacks[i];                                                                                    // 85
        if (callback === fn) {                                                                                      // 86
          callbacks.splice(i, 1);                                                                                   // 87
          break;                                                                                                    // 88
        }                                                                                                           // 89
      }                                                                                                             // 90
      return this;                                                                                                  // 91
    };                                                                                                              // 92
                                                                                                                    // 93
    return Emitter;                                                                                                 // 94
                                                                                                                    // 95
  })();                                                                                                             // 96
                                                                                                                    // 97
  Dropzone = (function(_super) {                                                                                    // 98
    var extend, resolveOption;                                                                                      // 99
                                                                                                                    // 100
    __extends(Dropzone, _super);                                                                                    // 101
                                                                                                                    // 102
    Dropzone.prototype.Emitter = Emitter;                                                                           // 103
                                                                                                                    // 104
                                                                                                                    // 105
    /*                                                                                                              // 106
    This is a list of all available events you can register on a dropzone object.                                   // 107
                                                                                                                    // 108
    You can register an event handler like this:                                                                    // 109
                                                                                                                    // 110
        dropzone.on("dragEnter", function() { });                                                                   // 111
     */                                                                                                             // 112
                                                                                                                    // 113
    Dropzone.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"];
                                                                                                                    // 115
    Dropzone.prototype.defaultOptions = {                                                                           // 116
      url: null,                                                                                                    // 117
      method: "post",                                                                                               // 118
      withCredentials: false,                                                                                       // 119
      parallelUploads: 2,                                                                                           // 120
      uploadMultiple: false,                                                                                        // 121
      maxFilesize: 256,                                                                                             // 122
      paramName: "file",                                                                                            // 123
      createImageThumbnails: true,                                                                                  // 124
      maxThumbnailFilesize: 10,                                                                                     // 125
      thumbnailWidth: 120,                                                                                          // 126
      thumbnailHeight: 120,                                                                                         // 127
      filesizeBase: 1000,                                                                                           // 128
      maxFiles: null,                                                                                               // 129
      filesizeBase: 1000,                                                                                           // 130
      params: {},                                                                                                   // 131
      clickable: true,                                                                                              // 132
      ignoreHiddenFiles: true,                                                                                      // 133
      acceptedFiles: null,                                                                                          // 134
      acceptedMimeTypes: null,                                                                                      // 135
      autoProcessQueue: true,                                                                                       // 136
      autoQueue: true,                                                                                              // 137
      addRemoveLinks: false,                                                                                        // 138
      previewsContainer: null,                                                                                      // 139
      capture: null,                                                                                                // 140
      dictDefaultMessage: "Drop files here to upload",                                                              // 141
      dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",                               // 142
      dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",          // 143
      dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",                       // 144
      dictInvalidFileType: "You can't upload files of this type.",                                                  // 145
      dictResponseError: "Server responded with {{statusCode}} code.",                                              // 146
      dictCancelUpload: "Cancel upload",                                                                            // 147
      dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",                                 // 148
      dictRemoveFile: "Remove file",                                                                                // 149
      dictRemoveFileConfirmation: null,                                                                             // 150
      dictMaxFilesExceeded: "You can not upload any more files.",                                                   // 151
      accept: function(file, done) {                                                                                // 152
        return done();                                                                                              // 153
      },                                                                                                            // 154
      init: function() {                                                                                            // 155
        return noop;                                                                                                // 156
      },                                                                                                            // 157
      forceFallback: false,                                                                                         // 158
      fallback: function() {                                                                                        // 159
        var child, messageElement, span, _i, _len, _ref;                                                            // 160
        this.element.className = "" + this.element.className + " dz-browser-not-supported";                         // 161
        _ref = this.element.getElementsByTagName("div");                                                            // 162
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                         // 163
          child = _ref[_i];                                                                                         // 164
          if (/(^| )dz-message($| )/.test(child.className)) {                                                       // 165
            messageElement = child;                                                                                 // 166
            child.className = "dz-message";                                                                         // 167
            continue;                                                                                               // 168
          }                                                                                                         // 169
        }                                                                                                           // 170
        if (!messageElement) {                                                                                      // 171
          messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");                 // 172
          this.element.appendChild(messageElement);                                                                 // 173
        }                                                                                                           // 174
        span = messageElement.getElementsByTagName("span")[0];                                                      // 175
        if (span) {                                                                                                 // 176
          span.textContent = this.options.dictFallbackMessage;                                                      // 177
        }                                                                                                           // 178
        return this.element.appendChild(this.getFallbackForm());                                                    // 179
      },                                                                                                            // 180
      resize: function(file) {                                                                                      // 181
        var info, srcRatio, trgRatio;                                                                               // 182
        info = {                                                                                                    // 183
          srcX: 0,                                                                                                  // 184
          srcY: 0,                                                                                                  // 185
          srcWidth: file.width,                                                                                     // 186
          srcHeight: file.height                                                                                    // 187
        };                                                                                                          // 188
        srcRatio = file.width / file.height;                                                                        // 189
        info.optWidth = this.options.thumbnailWidth;                                                                // 190
        info.optHeight = this.options.thumbnailHeight;                                                              // 191
        if ((info.optWidth == null) && (info.optHeight == null)) {                                                  // 192
          info.optWidth = info.srcWidth;                                                                            // 193
          info.optHeight = info.srcHeight;                                                                          // 194
        } else if (info.optWidth == null) {                                                                         // 195
          info.optWidth = srcRatio * info.optHeight;                                                                // 196
        } else if (info.optHeight == null) {                                                                        // 197
          info.optHeight = (1 / srcRatio) * info.optWidth;                                                          // 198
        }                                                                                                           // 199
        trgRatio = info.optWidth / info.optHeight;                                                                  // 200
        if (file.height < info.optHeight || file.width < info.optWidth) {                                           // 201
          info.trgHeight = info.srcHeight;                                                                          // 202
          info.trgWidth = info.srcWidth;                                                                            // 203
        } else {                                                                                                    // 204
          if (srcRatio > trgRatio) {                                                                                // 205
            info.srcHeight = file.height;                                                                           // 206
            info.srcWidth = info.srcHeight * trgRatio;                                                              // 207
          } else {                                                                                                  // 208
            info.srcWidth = file.width;                                                                             // 209
            info.srcHeight = info.srcWidth / trgRatio;                                                              // 210
          }                                                                                                         // 211
        }                                                                                                           // 212
        info.srcX = (file.width - info.srcWidth) / 2;                                                               // 213
        info.srcY = (file.height - info.srcHeight) / 2;                                                             // 214
        return info;                                                                                                // 215
      },                                                                                                            // 216
                                                                                                                    // 217
      /*                                                                                                            // 218
      Those functions register themselves to the events on init and handle all                                      // 219
      the user interface specific stuff. Overwriting them won't break the upload                                    // 220
      but can break the way it's displayed.                                                                         // 221
      You can overwrite them if you don't like the default behavior. If you just                                    // 222
      want to add an additional event handler, register it on the dropzone object                                   // 223
      and don't overwrite those options.                                                                            // 224
       */                                                                                                           // 225
      drop: function(e) {                                                                                           // 226
        return this.element.classList.remove("dz-drag-hover");                                                      // 227
      },                                                                                                            // 228
      dragstart: noop,                                                                                              // 229
      dragend: function(e) {                                                                                        // 230
        return this.element.classList.remove("dz-drag-hover");                                                      // 231
      },                                                                                                            // 232
      dragenter: function(e) {                                                                                      // 233
        return this.element.classList.add("dz-drag-hover");                                                         // 234
      },                                                                                                            // 235
      dragover: function(e) {                                                                                       // 236
        return this.element.classList.add("dz-drag-hover");                                                         // 237
      },                                                                                                            // 238
      dragleave: function(e) {                                                                                      // 239
        return this.element.classList.remove("dz-drag-hover");                                                      // 240
      },                                                                                                            // 241
      paste: noop,                                                                                                  // 242
      reset: function() {                                                                                           // 243
        return this.element.classList.remove("dz-started");                                                         // 244
      },                                                                                                            // 245
      addedfile: function(file) {                                                                                   // 246
        var node, removeFileEvent, removeLink, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;        // 247
        if (this.element === this.previewsContainer) {                                                              // 248
          this.element.classList.add("dz-started");                                                                 // 249
        }                                                                                                           // 250
        if (this.previewsContainer) {                                                                               // 251
          file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());                        // 252
          file.previewTemplate = file.previewElement;                                                               // 253
          this.previewsContainer.appendChild(file.previewElement);                                                  // 254
          _ref = file.previewElement.querySelectorAll("[data-dz-name]");                                            // 255
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                       // 256
            node = _ref[_i];                                                                                        // 257
            node.textContent = file.name;                                                                           // 258
          }                                                                                                         // 259
          _ref1 = file.previewElement.querySelectorAll("[data-dz-size]");                                           // 260
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {                                                    // 261
            node = _ref1[_j];                                                                                       // 262
            node.innerHTML = this.filesize(file.size);                                                              // 263
          }                                                                                                         // 264
          if (this.options.addRemoveLinks) {                                                                        // 265
            file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>" + this.options.dictRemoveFile + "</a>");
            file.previewElement.appendChild(file._removeLink);                                                      // 267
          }                                                                                                         // 268
          removeFileEvent = (function(_this) {                                                                      // 269
            return function(e) {                                                                                    // 270
              e.preventDefault();                                                                                   // 271
              e.stopPropagation();                                                                                  // 272
              if (file.status === Dropzone.UPLOADING) {                                                             // 273
                return Dropzone.confirm(_this.options.dictCancelUploadConfirmation, function() {                    // 274
                  return _this.removeFile(file);                                                                    // 275
                });                                                                                                 // 276
              } else {                                                                                              // 277
                if (_this.options.dictRemoveFileConfirmation) {                                                     // 278
                  return Dropzone.confirm(_this.options.dictRemoveFileConfirmation, function() {                    // 279
                    return _this.removeFile(file);                                                                  // 280
                  });                                                                                               // 281
                } else {                                                                                            // 282
                  return _this.removeFile(file);                                                                    // 283
                }                                                                                                   // 284
              }                                                                                                     // 285
            };                                                                                                      // 286
          })(this);                                                                                                 // 287
          _ref2 = file.previewElement.querySelectorAll("[data-dz-remove]");                                         // 288
          _results = [];                                                                                            // 289
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {                                                    // 290
            removeLink = _ref2[_k];                                                                                 // 291
            _results.push(removeLink.addEventListener("click", removeFileEvent));                                   // 292
          }                                                                                                         // 293
          return _results;                                                                                          // 294
        }                                                                                                           // 295
      },                                                                                                            // 296
      removedfile: function(file) {                                                                                 // 297
        var _ref;                                                                                                   // 298
        if (file.previewElement) {                                                                                  // 299
          if ((_ref = file.previewElement) != null) {                                                               // 300
            _ref.parentNode.removeChild(file.previewElement);                                                       // 301
          }                                                                                                         // 302
        }                                                                                                           // 303
        return this._updateMaxFilesReachedClass();                                                                  // 304
      },                                                                                                            // 305
      thumbnail: function(file, dataUrl) {                                                                          // 306
        var thumbnailElement, _i, _len, _ref;                                                                       // 307
        if (file.previewElement) {                                                                                  // 308
          file.previewElement.classList.remove("dz-file-preview");                                                  // 309
          _ref = file.previewElement.querySelectorAll("[data-dz-thumbnail]");                                       // 310
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                       // 311
            thumbnailElement = _ref[_i];                                                                            // 312
            thumbnailElement.alt = file.name;                                                                       // 313
            thumbnailElement.src = dataUrl;                                                                         // 314
          }                                                                                                         // 315
          return setTimeout(((function(_this) {                                                                     // 316
            return function() {                                                                                     // 317
              return file.previewElement.classList.add("dz-image-preview");                                         // 318
            };                                                                                                      // 319
          })(this)), 1);                                                                                            // 320
        }                                                                                                           // 321
      },                                                                                                            // 322
      error: function(file, message) {                                                                              // 323
        var node, _i, _len, _ref, _results;                                                                         // 324
        if (file.previewElement) {                                                                                  // 325
          file.previewElement.classList.add("dz-error");                                                            // 326
          if (typeof message !== "String" && message.error) {                                                       // 327
            message = message.error;                                                                                // 328
          }                                                                                                         // 329
          _ref = file.previewElement.querySelectorAll("[data-dz-errormessage]");                                    // 330
          _results = [];                                                                                            // 331
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                       // 332
            node = _ref[_i];                                                                                        // 333
            _results.push(node.textContent = message);                                                              // 334
          }                                                                                                         // 335
          return _results;                                                                                          // 336
        }                                                                                                           // 337
      },                                                                                                            // 338
      errormultiple: noop,                                                                                          // 339
      processing: function(file) {                                                                                  // 340
        if (file.previewElement) {                                                                                  // 341
          file.previewElement.classList.add("dz-processing");                                                       // 342
          if (file._removeLink) {                                                                                   // 343
            return file._removeLink.textContent = this.options.dictCancelUpload;                                    // 344
          }                                                                                                         // 345
        }                                                                                                           // 346
      },                                                                                                            // 347
      processingmultiple: noop,                                                                                     // 348
      uploadprogress: function(file, progress, bytesSent) {                                                         // 349
        var node, _i, _len, _ref, _results;                                                                         // 350
        if (file.previewElement) {                                                                                  // 351
          _ref = file.previewElement.querySelectorAll("[data-dz-uploadprogress]");                                  // 352
          _results = [];                                                                                            // 353
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                       // 354
            node = _ref[_i];                                                                                        // 355
            if (node.nodeName === 'PROGRESS') {                                                                     // 356
              _results.push(node.value = progress);                                                                 // 357
            } else {                                                                                                // 358
              _results.push(node.style.width = "" + progress + "%");                                                // 359
            }                                                                                                       // 360
          }                                                                                                         // 361
          return _results;                                                                                          // 362
        }                                                                                                           // 363
      },                                                                                                            // 364
      totaluploadprogress: noop,                                                                                    // 365
      sending: noop,                                                                                                // 366
      sendingmultiple: noop,                                                                                        // 367
      success: function(file) {                                                                                     // 368
        if (file.previewElement) {                                                                                  // 369
          return file.previewElement.classList.add("dz-success");                                                   // 370
        }                                                                                                           // 371
      },                                                                                                            // 372
      successmultiple: noop,                                                                                        // 373
      canceled: function(file) {                                                                                    // 374
        return this.emit("error", file, "Upload canceled.");                                                        // 375
      },                                                                                                            // 376
      canceledmultiple: noop,                                                                                       // 377
      complete: function(file) {                                                                                    // 378
        if (file._removeLink) {                                                                                     // 379
          file._removeLink.textContent = this.options.dictRemoveFile;                                               // 380
        }                                                                                                           // 381
        if (file.previewElement) {                                                                                  // 382
          return file.previewElement.classList.add("dz-complete");                                                  // 383
        }                                                                                                           // 384
      },                                                                                                            // 385
      completemultiple: noop,                                                                                       // 386
      maxfilesexceeded: noop,                                                                                       // 387
      maxfilesreached: noop,                                                                                        // 388
      queuecomplete: noop,                                                                                          // 389
      previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"
    };                                                                                                              // 391
                                                                                                                    // 392
    extend = function() {                                                                                           // 393
      var key, object, objects, target, val, _i, _len;                                                              // 394
      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];                     // 395
      for (_i = 0, _len = objects.length; _i < _len; _i++) {                                                        // 396
        object = objects[_i];                                                                                       // 397
        for (key in object) {                                                                                       // 398
          val = object[key];                                                                                        // 399
          target[key] = val;                                                                                        // 400
        }                                                                                                           // 401
      }                                                                                                             // 402
      return target;                                                                                                // 403
    };                                                                                                              // 404
                                                                                                                    // 405
    function Dropzone(element, options) {                                                                           // 406
      var elementOptions, fallback, _ref;                                                                           // 407
      this.element = element;                                                                                       // 408
      this.version = Dropzone.version;                                                                              // 409
      this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, "");                // 410
      this.clickableElements = [];                                                                                  // 411
      this.listeners = [];                                                                                          // 412
      this.files = [];                                                                                              // 413
      if (typeof this.element === "string") {                                                                       // 414
        this.element = document.querySelector(this.element);                                                        // 415
      }                                                                                                             // 416
      if (!(this.element && (this.element.nodeType != null))) {                                                     // 417
        throw new Error("Invalid dropzone element.");                                                               // 418
      }                                                                                                             // 419
      if (this.element.dropzone) {                                                                                  // 420
        throw new Error("Dropzone already attached.");                                                              // 421
      }                                                                                                             // 422
      Dropzone.instances.push(this);                                                                                // 423
      this.element.dropzone = this;                                                                                 // 424
      elementOptions = (_ref = Dropzone.optionsForElement(this.element)) != null ? _ref : {};                       // 425
      this.options = extend({}, this.defaultOptions, elementOptions, options != null ? options : {});               // 426
      if (this.options.forceFallback || !Dropzone.isBrowserSupported()) {                                           // 427
        return this.options.fallback.call(this);                                                                    // 428
      }                                                                                                             // 429
      if (this.options.url == null) {                                                                               // 430
        this.options.url = this.element.getAttribute("action");                                                     // 431
      }                                                                                                             // 432
      if (!this.options.url) {                                                                                      // 433
        throw new Error("No URL provided.");                                                                        // 434
      }                                                                                                             // 435
      if (this.options.acceptedFiles && this.options.acceptedMimeTypes) {                                           // 436
        throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
      }                                                                                                             // 438
      if (this.options.acceptedMimeTypes) {                                                                         // 439
        this.options.acceptedFiles = this.options.acceptedMimeTypes;                                                // 440
        delete this.options.acceptedMimeTypes;                                                                      // 441
      }                                                                                                             // 442
      this.options.method = this.options.method.toUpperCase();                                                      // 443
      if ((fallback = this.getExistingFallback()) && fallback.parentNode) {                                         // 444
        fallback.parentNode.removeChild(fallback);                                                                  // 445
      }                                                                                                             // 446
      if (this.options.previewsContainer !== false) {                                                               // 447
        if (this.options.previewsContainer) {                                                                       // 448
          this.previewsContainer = Dropzone.getElement(this.options.previewsContainer, "previewsContainer");        // 449
        } else {                                                                                                    // 450
          this.previewsContainer = this.element;                                                                    // 451
        }                                                                                                           // 452
      }                                                                                                             // 453
      if (this.options.clickable) {                                                                                 // 454
        if (this.options.clickable === true) {                                                                      // 455
          this.clickableElements = [this.element];                                                                  // 456
        } else {                                                                                                    // 457
          this.clickableElements = Dropzone.getElements(this.options.clickable, "clickable");                       // 458
        }                                                                                                           // 459
      }                                                                                                             // 460
      this.init();                                                                                                  // 461
    }                                                                                                               // 462
                                                                                                                    // 463
    Dropzone.prototype.getAcceptedFiles = function() {                                                              // 464
      var file, _i, _len, _ref, _results;                                                                           // 465
      _ref = this.files;                                                                                            // 466
      _results = [];                                                                                                // 467
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                           // 468
        file = _ref[_i];                                                                                            // 469
        if (file.accepted) {                                                                                        // 470
          _results.push(file);                                                                                      // 471
        }                                                                                                           // 472
      }                                                                                                             // 473
      return _results;                                                                                              // 474
    };                                                                                                              // 475
                                                                                                                    // 476
    Dropzone.prototype.getRejectedFiles = function() {                                                              // 477
      var file, _i, _len, _ref, _results;                                                                           // 478
      _ref = this.files;                                                                                            // 479
      _results = [];                                                                                                // 480
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                           // 481
        file = _ref[_i];                                                                                            // 482
        if (!file.accepted) {                                                                                       // 483
          _results.push(file);                                                                                      // 484
        }                                                                                                           // 485
      }                                                                                                             // 486
      return _results;                                                                                              // 487
    };                                                                                                              // 488
                                                                                                                    // 489
    Dropzone.prototype.getFilesWithStatus = function(status) {                                                      // 490
      var file, _i, _len, _ref, _results;                                                                           // 491
      _ref = this.files;                                                                                            // 492
      _results = [];                                                                                                // 493
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                           // 494
        file = _ref[_i];                                                                                            // 495
        if (file.status === status) {                                                                               // 496
          _results.push(file);                                                                                      // 497
        }                                                                                                           // 498
      }                                                                                                             // 499
      return _results;                                                                                              // 500
    };                                                                                                              // 501
                                                                                                                    // 502
    Dropzone.prototype.getQueuedFiles = function() {                                                                // 503
      return this.getFilesWithStatus(Dropzone.QUEUED);                                                              // 504
    };                                                                                                              // 505
                                                                                                                    // 506
    Dropzone.prototype.getUploadingFiles = function() {                                                             // 507
      return this.getFilesWithStatus(Dropzone.UPLOADING);                                                           // 508
    };                                                                                                              // 509
                                                                                                                    // 510
    Dropzone.prototype.getActiveFiles = function() {                                                                // 511
      var file, _i, _len, _ref, _results;                                                                           // 512
      _ref = this.files;                                                                                            // 513
      _results = [];                                                                                                // 514
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                           // 515
        file = _ref[_i];                                                                                            // 516
        if (file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED) {                                // 517
          _results.push(file);                                                                                      // 518
        }                                                                                                           // 519
      }                                                                                                             // 520
      return _results;                                                                                              // 521
    };                                                                                                              // 522
                                                                                                                    // 523
    Dropzone.prototype.init = function() {                                                                          // 524
      var eventName, noPropagation, setupHiddenFileInput, _i, _len, _ref, _ref1;                                    // 525
      if (this.element.tagName === "form") {                                                                        // 526
        this.element.setAttribute("enctype", "multipart/form-data");                                                // 527
      }                                                                                                             // 528
      if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {              // 529
        this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
      }                                                                                                             // 531
      if (this.clickableElements.length) {                                                                          // 532
        setupHiddenFileInput = (function(_this) {                                                                   // 533
          return function() {                                                                                       // 534
            if (_this.hiddenFileInput) {                                                                            // 535
              document.body.removeChild(_this.hiddenFileInput);                                                     // 536
            }                                                                                                       // 537
            _this.hiddenFileInput = document.createElement("input");                                                // 538
            _this.hiddenFileInput.setAttribute("type", "file");                                                     // 539
            if ((_this.options.maxFiles == null) || _this.options.maxFiles > 1) {                                   // 540
              _this.hiddenFileInput.setAttribute("multiple", "multiple");                                           // 541
            }                                                                                                       // 542
            _this.hiddenFileInput.className = "dz-hidden-input";                                                    // 543
            if (_this.options.acceptedFiles != null) {                                                              // 544
              _this.hiddenFileInput.setAttribute("accept", _this.options.acceptedFiles);                            // 545
            }                                                                                                       // 546
            if (_this.options.capture != null) {                                                                    // 547
              _this.hiddenFileInput.setAttribute("capture", _this.options.capture);                                 // 548
            }                                                                                                       // 549
            _this.hiddenFileInput.style.visibility = "hidden";                                                      // 550
            _this.hiddenFileInput.style.position = "absolute";                                                      // 551
            _this.hiddenFileInput.style.top = "0";                                                                  // 552
            _this.hiddenFileInput.style.left = "0";                                                                 // 553
            _this.hiddenFileInput.style.height = "0";                                                               // 554
            _this.hiddenFileInput.style.width = "0";                                                                // 555
            document.body.appendChild(_this.hiddenFileInput);                                                       // 556
            return _this.hiddenFileInput.addEventListener("change", function() {                                    // 557
              var file, files, _i, _len;                                                                            // 558
              files = _this.hiddenFileInput.files;                                                                  // 559
              if (files.length) {                                                                                   // 560
                for (_i = 0, _len = files.length; _i < _len; _i++) {                                                // 561
                  file = files[_i];                                                                                 // 562
                  _this.addFile(file);                                                                              // 563
                }                                                                                                   // 564
              }                                                                                                     // 565
              return setupHiddenFileInput();                                                                        // 566
            });                                                                                                     // 567
          };                                                                                                        // 568
        })(this);                                                                                                   // 569
        setupHiddenFileInput();                                                                                     // 570
      }                                                                                                             // 571
      this.URL = (_ref = window.URL) != null ? _ref : window.webkitURL;                                             // 572
      _ref1 = this.events;                                                                                          // 573
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {                                                          // 574
        eventName = _ref1[_i];                                                                                      // 575
        this.on(eventName, this.options[eventName]);                                                                // 576
      }                                                                                                             // 577
      this.on("uploadprogress", (function(_this) {                                                                  // 578
        return function() {                                                                                         // 579
          return _this.updateTotalUploadProgress();                                                                 // 580
        };                                                                                                          // 581
      })(this));                                                                                                    // 582
      this.on("removedfile", (function(_this) {                                                                     // 583
        return function() {                                                                                         // 584
          return _this.updateTotalUploadProgress();                                                                 // 585
        };                                                                                                          // 586
      })(this));                                                                                                    // 587
      this.on("canceled", (function(_this) {                                                                        // 588
        return function(file) {                                                                                     // 589
          return _this.emit("complete", file);                                                                      // 590
        };                                                                                                          // 591
      })(this));                                                                                                    // 592
      this.on("complete", (function(_this) {                                                                        // 593
        return function(file) {                                                                                     // 594
          if (_this.getUploadingFiles().length === 0 && _this.getQueuedFiles().length === 0) {                      // 595
            return setTimeout((function() {                                                                         // 596
              return _this.emit("queuecomplete");                                                                   // 597
            }), 0);                                                                                                 // 598
          }                                                                                                         // 599
        };                                                                                                          // 600
      })(this));                                                                                                    // 601
      noPropagation = function(e) {                                                                                 // 602
        e.stopPropagation();                                                                                        // 603
        if (e.preventDefault) {                                                                                     // 604
          return e.preventDefault();                                                                                // 605
        } else {                                                                                                    // 606
          return e.returnValue = false;                                                                             // 607
        }                                                                                                           // 608
      };                                                                                                            // 609
      this.listeners = [                                                                                            // 610
        {                                                                                                           // 611
          element: this.element,                                                                                    // 612
          events: {                                                                                                 // 613
            "dragstart": (function(_this) {                                                                         // 614
              return function(e) {                                                                                  // 615
                return _this.emit("dragstart", e);                                                                  // 616
              };                                                                                                    // 617
            })(this),                                                                                               // 618
            "dragenter": (function(_this) {                                                                         // 619
              return function(e) {                                                                                  // 620
                noPropagation(e);                                                                                   // 621
                return _this.emit("dragenter", e);                                                                  // 622
              };                                                                                                    // 623
            })(this),                                                                                               // 624
            "dragover": (function(_this) {                                                                          // 625
              return function(e) {                                                                                  // 626
                var efct;                                                                                           // 627
                try {                                                                                               // 628
                  efct = e.dataTransfer.effectAllowed;                                                              // 629
                } catch (_error) {}                                                                                 // 630
                e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';               // 631
                noPropagation(e);                                                                                   // 632
                return _this.emit("dragover", e);                                                                   // 633
              };                                                                                                    // 634
            })(this),                                                                                               // 635
            "dragleave": (function(_this) {                                                                         // 636
              return function(e) {                                                                                  // 637
                return _this.emit("dragleave", e);                                                                  // 638
              };                                                                                                    // 639
            })(this),                                                                                               // 640
            "drop": (function(_this) {                                                                              // 641
              return function(e) {                                                                                  // 642
                noPropagation(e);                                                                                   // 643
                return _this.drop(e);                                                                               // 644
              };                                                                                                    // 645
            })(this),                                                                                               // 646
            "dragend": (function(_this) {                                                                           // 647
              return function(e) {                                                                                  // 648
                return _this.emit("dragend", e);                                                                    // 649
              };                                                                                                    // 650
            })(this)                                                                                                // 651
          }                                                                                                         // 652
        }                                                                                                           // 653
      ];                                                                                                            // 654
      this.clickableElements.forEach((function(_this) {                                                             // 655
        return function(clickableElement) {                                                                         // 656
          return _this.listeners.push({                                                                             // 657
            element: clickableElement,                                                                              // 658
            events: {                                                                                               // 659
              "click": function(evt) {                                                                              // 660
                if ((clickableElement !== _this.element) || (evt.target === _this.element || Dropzone.elementInside(evt.target, _this.element.querySelector(".dz-message")))) {
                  return _this.hiddenFileInput.click();                                                             // 662
                }                                                                                                   // 663
              }                                                                                                     // 664
            }                                                                                                       // 665
          });                                                                                                       // 666
        };                                                                                                          // 667
      })(this));                                                                                                    // 668
      this.enable();                                                                                                // 669
      return this.options.init.call(this);                                                                          // 670
    };                                                                                                              // 671
                                                                                                                    // 672
    Dropzone.prototype.destroy = function() {                                                                       // 673
      var _ref;                                                                                                     // 674
      this.disable();                                                                                               // 675
      this.removeAllFiles(true);                                                                                    // 676
      if ((_ref = this.hiddenFileInput) != null ? _ref.parentNode : void 0) {                                       // 677
        this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);                                          // 678
        this.hiddenFileInput = null;                                                                                // 679
      }                                                                                                             // 680
      delete this.element.dropzone;                                                                                 // 681
      return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);                                        // 682
    };                                                                                                              // 683
                                                                                                                    // 684
    Dropzone.prototype.updateTotalUploadProgress = function() {                                                     // 685
      var activeFiles, file, totalBytes, totalBytesSent, totalUploadProgress, _i, _len, _ref;                       // 686
      totalBytesSent = 0;                                                                                           // 687
      totalBytes = 0;                                                                                               // 688
      activeFiles = this.getActiveFiles();                                                                          // 689
      if (activeFiles.length) {                                                                                     // 690
        _ref = this.getActiveFiles();                                                                               // 691
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                         // 692
          file = _ref[_i];                                                                                          // 693
          totalBytesSent += file.upload.bytesSent;                                                                  // 694
          totalBytes += file.upload.total;                                                                          // 695
        }                                                                                                           // 696
        totalUploadProgress = 100 * totalBytesSent / totalBytes;                                                    // 697
      } else {                                                                                                      // 698
        totalUploadProgress = 100;                                                                                  // 699
      }                                                                                                             // 700
      return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);                     // 701
    };                                                                                                              // 702
                                                                                                                    // 703
    Dropzone.prototype._getParamName = function(n) {                                                                // 704
      if (typeof this.options.paramName === "function") {                                                           // 705
        return this.options.paramName(n);                                                                           // 706
      } else {                                                                                                      // 707
        return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");                    // 708
      }                                                                                                             // 709
    };                                                                                                              // 710
                                                                                                                    // 711
    Dropzone.prototype.getFallbackForm = function() {                                                               // 712
      var existingFallback, fields, fieldsString, form;                                                             // 713
      if (existingFallback = this.getExistingFallback()) {                                                          // 714
        return existingFallback;                                                                                    // 715
      }                                                                                                             // 716
      fieldsString = "<div class=\"dz-fallback\">";                                                                 // 717
      if (this.options.dictFallbackText) {                                                                          // 718
        fieldsString += "<p>" + this.options.dictFallbackText + "</p>";                                             // 719
      }                                                                                                             // 720
      fieldsString += "<input type=\"file\" name=\"" + (this._getParamName(0)) + "\" " + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + " /><input type=\"submit\" value=\"Upload!\"></div>";
      fields = Dropzone.createElement(fieldsString);                                                                // 722
      if (this.element.tagName !== "FORM") {                                                                        // 723
        form = Dropzone.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>");
        form.appendChild(fields);                                                                                   // 725
      } else {                                                                                                      // 726
        this.element.setAttribute("enctype", "multipart/form-data");                                                // 727
        this.element.setAttribute("method", this.options.method);                                                   // 728
      }                                                                                                             // 729
      return form != null ? form : fields;                                                                          // 730
    };                                                                                                              // 731
                                                                                                                    // 732
    Dropzone.prototype.getExistingFallback = function() {                                                           // 733
      var fallback, getFallback, tagName, _i, _len, _ref;                                                           // 734
      getFallback = function(elements) {                                                                            // 735
        var el, _i, _len;                                                                                           // 736
        for (_i = 0, _len = elements.length; _i < _len; _i++) {                                                     // 737
          el = elements[_i];                                                                                        // 738
          if (/(^| )fallback($| )/.test(el.className)) {                                                            // 739
            return el;                                                                                              // 740
          }                                                                                                         // 741
        }                                                                                                           // 742
      };                                                                                                            // 743
      _ref = ["div", "form"];                                                                                       // 744
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                           // 745
        tagName = _ref[_i];                                                                                         // 746
        if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {                                   // 747
          return fallback;                                                                                          // 748
        }                                                                                                           // 749
      }                                                                                                             // 750
    };                                                                                                              // 751
                                                                                                                    // 752
    Dropzone.prototype.setupEventListeners = function() {                                                           // 753
      var elementListeners, event, listener, _i, _len, _ref, _results;                                              // 754
      _ref = this.listeners;                                                                                        // 755
      _results = [];                                                                                                // 756
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                           // 757
        elementListeners = _ref[_i];                                                                                // 758
        _results.push((function() {                                                                                 // 759
          var _ref1, _results1;                                                                                     // 760
          _ref1 = elementListeners.events;                                                                          // 761
          _results1 = [];                                                                                           // 762
          for (event in _ref1) {                                                                                    // 763
            listener = _ref1[event];                                                                                // 764
            _results1.push(elementListeners.element.addEventListener(event, listener, false));                      // 765
          }                                                                                                         // 766
          return _results1;                                                                                         // 767
        })());                                                                                                      // 768
      }                                                                                                             // 769
      return _results;                                                                                              // 770
    };                                                                                                              // 771
                                                                                                                    // 772
    Dropzone.prototype.removeEventListeners = function() {                                                          // 773
      var elementListeners, event, listener, _i, _len, _ref, _results;                                              // 774
      _ref = this.listeners;                                                                                        // 775
      _results = [];                                                                                                // 776
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                           // 777
        elementListeners = _ref[_i];                                                                                // 778
        _results.push((function() {                                                                                 // 779
          var _ref1, _results1;                                                                                     // 780
          _ref1 = elementListeners.events;                                                                          // 781
          _results1 = [];                                                                                           // 782
          for (event in _ref1) {                                                                                    // 783
            listener = _ref1[event];                                                                                // 784
            _results1.push(elementListeners.element.removeEventListener(event, listener, false));                   // 785
          }                                                                                                         // 786
          return _results1;                                                                                         // 787
        })());                                                                                                      // 788
      }                                                                                                             // 789
      return _results;                                                                                              // 790
    };                                                                                                              // 791
                                                                                                                    // 792
    Dropzone.prototype.disable = function() {                                                                       // 793
      var file, _i, _len, _ref, _results;                                                                           // 794
      this.clickableElements.forEach(function(element) {                                                            // 795
        return element.classList.remove("dz-clickable");                                                            // 796
      });                                                                                                           // 797
      this.removeEventListeners();                                                                                  // 798
      _ref = this.files;                                                                                            // 799
      _results = [];                                                                                                // 800
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                           // 801
        file = _ref[_i];                                                                                            // 802
        _results.push(this.cancelUpload(file));                                                                     // 803
      }                                                                                                             // 804
      return _results;                                                                                              // 805
    };                                                                                                              // 806
                                                                                                                    // 807
    Dropzone.prototype.enable = function() {                                                                        // 808
      this.clickableElements.forEach(function(element) {                                                            // 809
        return element.classList.add("dz-clickable");                                                               // 810
      });                                                                                                           // 811
      return this.setupEventListeners();                                                                            // 812
    };                                                                                                              // 813
                                                                                                                    // 814
    Dropzone.prototype.filesize = function(size) {                                                                  // 815
      var cutoff, i, selectedSize, selectedUnit, unit, units, _i, _len;                                             // 816
      units = ['TB', 'GB', 'MB', 'KB', 'b'];                                                                        // 817
      selectedSize = selectedUnit = null;                                                                           // 818
      for (i = _i = 0, _len = units.length; _i < _len; i = ++_i) {                                                  // 819
        unit = units[i];                                                                                            // 820
        cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;                                                   // 821
        if (size >= cutoff) {                                                                                       // 822
          selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);                                         // 823
          selectedUnit = unit;                                                                                      // 824
          break;                                                                                                    // 825
        }                                                                                                           // 826
      }                                                                                                             // 827
      selectedSize = Math.round(10 * selectedSize) / 10;                                                            // 828
      return "<strong>" + selectedSize + "</strong> " + selectedUnit;                                               // 829
    };                                                                                                              // 830
                                                                                                                    // 831
    Dropzone.prototype._updateMaxFilesReachedClass = function() {                                                   // 832
      if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {             // 833
        if (this.getAcceptedFiles().length === this.options.maxFiles) {                                             // 834
          this.emit('maxfilesreached', this.files);                                                                 // 835
        }                                                                                                           // 836
        return this.element.classList.add("dz-max-files-reached");                                                  // 837
      } else {                                                                                                      // 838
        return this.element.classList.remove("dz-max-files-reached");                                               // 839
      }                                                                                                             // 840
    };                                                                                                              // 841
                                                                                                                    // 842
    Dropzone.prototype.drop = function(e) {                                                                         // 843
      var files, items;                                                                                             // 844
      if (!e.dataTransfer) {                                                                                        // 845
        return;                                                                                                     // 846
      }                                                                                                             // 847
      this.emit("drop", e);                                                                                         // 848
      files = e.dataTransfer.files;                                                                                 // 849
      if (files.length) {                                                                                           // 850
        items = e.dataTransfer.items;                                                                               // 851
        if (items && items.length && (items[0].webkitGetAsEntry != null)) {                                         // 852
          this._addFilesFromItems(items);                                                                           // 853
        } else {                                                                                                    // 854
          this.handleFiles(files);                                                                                  // 855
        }                                                                                                           // 856
      }                                                                                                             // 857
    };                                                                                                              // 858
                                                                                                                    // 859
    Dropzone.prototype.paste = function(e) {                                                                        // 860
      var items, _ref;                                                                                              // 861
      if ((e != null ? (_ref = e.clipboardData) != null ? _ref.items : void 0 : void 0) == null) {                  // 862
        return;                                                                                                     // 863
      }                                                                                                             // 864
      this.emit("paste", e);                                                                                        // 865
      items = e.clipboardData.items;                                                                                // 866
      if (items.length) {                                                                                           // 867
        return this._addFilesFromItems(items);                                                                      // 868
      }                                                                                                             // 869
    };                                                                                                              // 870
                                                                                                                    // 871
    Dropzone.prototype.handleFiles = function(files) {                                                              // 872
      var file, _i, _len, _results;                                                                                 // 873
      _results = [];                                                                                                // 874
      for (_i = 0, _len = files.length; _i < _len; _i++) {                                                          // 875
        file = files[_i];                                                                                           // 876
        _results.push(this.addFile(file));                                                                          // 877
      }                                                                                                             // 878
      return _results;                                                                                              // 879
    };                                                                                                              // 880
                                                                                                                    // 881
    Dropzone.prototype._addFilesFromItems = function(items) {                                                       // 882
      var entry, item, _i, _len, _results;                                                                          // 883
      _results = [];                                                                                                // 884
      for (_i = 0, _len = items.length; _i < _len; _i++) {                                                          // 885
        item = items[_i];                                                                                           // 886
        if ((item.webkitGetAsEntry != null) && (entry = item.webkitGetAsEntry())) {                                 // 887
          if (entry.isFile) {                                                                                       // 888
            _results.push(this.addFile(item.getAsFile()));                                                          // 889
          } else if (entry.isDirectory) {                                                                           // 890
            _results.push(this._addFilesFromDirectory(entry, entry.name));                                          // 891
          } else {                                                                                                  // 892
            _results.push(void 0);                                                                                  // 893
          }                                                                                                         // 894
        } else if (item.getAsFile != null) {                                                                        // 895
          if ((item.kind == null) || item.kind === "file") {                                                        // 896
            _results.push(this.addFile(item.getAsFile()));                                                          // 897
          } else {                                                                                                  // 898
            _results.push(void 0);                                                                                  // 899
          }                                                                                                         // 900
        } else {                                                                                                    // 901
          _results.push(void 0);                                                                                    // 902
        }                                                                                                           // 903
      }                                                                                                             // 904
      return _results;                                                                                              // 905
    };                                                                                                              // 906
                                                                                                                    // 907
    Dropzone.prototype._addFilesFromDirectory = function(directory, path) {                                         // 908
      var dirReader, entriesReader;                                                                                 // 909
      dirReader = directory.createReader();                                                                         // 910
      entriesReader = (function(_this) {                                                                            // 911
        return function(entries) {                                                                                  // 912
          var entry, _i, _len;                                                                                      // 913
          for (_i = 0, _len = entries.length; _i < _len; _i++) {                                                    // 914
            entry = entries[_i];                                                                                    // 915
            if (entry.isFile) {                                                                                     // 916
              entry.file(function(file) {                                                                           // 917
                if (_this.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {                         // 918
                  return;                                                                                           // 919
                }                                                                                                   // 920
                file.fullPath = "" + path + "/" + file.name;                                                        // 921
                return _this.addFile(file);                                                                         // 922
              });                                                                                                   // 923
            } else if (entry.isDirectory) {                                                                         // 924
              _this._addFilesFromDirectory(entry, "" + path + "/" + entry.name);                                    // 925
            }                                                                                                       // 926
          }                                                                                                         // 927
        };                                                                                                          // 928
      })(this);                                                                                                     // 929
      return dirReader.readEntries(entriesReader, function(error) {                                                 // 930
        return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log(error) : void 0 : void 0;
      });                                                                                                           // 932
    };                                                                                                              // 933
                                                                                                                    // 934
    Dropzone.prototype.accept = function(file, done) {                                                              // 935
      if (file.size > this.options.maxFilesize * 1024 * 1024) {                                                     // 936
        return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
      } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {                                         // 938
        return done(this.options.dictInvalidFileType);                                                              // 939
      } else if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {      // 940
        done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));                     // 941
        return this.emit("maxfilesexceeded", file);                                                                 // 942
      } else {                                                                                                      // 943
        return this.options.accept.call(this, file, done);                                                          // 944
      }                                                                                                             // 945
    };                                                                                                              // 946
                                                                                                                    // 947
    Dropzone.prototype.addFile = function(file) {                                                                   // 948
      file.upload = {                                                                                               // 949
        progress: 0,                                                                                                // 950
        total: file.size,                                                                                           // 951
        bytesSent: 0                                                                                                // 952
      };                                                                                                            // 953
      this.files.push(file);                                                                                        // 954
      file.status = Dropzone.ADDED;                                                                                 // 955
      this.emit("addedfile", file);                                                                                 // 956
      this._enqueueThumbnail(file);                                                                                 // 957
      return this.accept(file, (function(_this) {                                                                   // 958
        return function(error) {                                                                                    // 959
          if (error) {                                                                                              // 960
            file.accepted = false;                                                                                  // 961
            _this._errorProcessing([file], error);                                                                  // 962
          } else {                                                                                                  // 963
            file.accepted = true;                                                                                   // 964
            if (_this.options.autoQueue) {                                                                          // 965
              _this.enqueueFile(file);                                                                              // 966
            }                                                                                                       // 967
          }                                                                                                         // 968
          return _this._updateMaxFilesReachedClass();                                                               // 969
        };                                                                                                          // 970
      })(this));                                                                                                    // 971
    };                                                                                                              // 972
                                                                                                                    // 973
    Dropzone.prototype.enqueueFiles = function(files) {                                                             // 974
      var file, _i, _len;                                                                                           // 975
      for (_i = 0, _len = files.length; _i < _len; _i++) {                                                          // 976
        file = files[_i];                                                                                           // 977
        this.enqueueFile(file);                                                                                     // 978
      }                                                                                                             // 979
      return null;                                                                                                  // 980
    };                                                                                                              // 981
                                                                                                                    // 982
    Dropzone.prototype.enqueueFile = function(file) {                                                               // 983
      if (file.status === Dropzone.ADDED && file.accepted === true) {                                               // 984
        file.status = Dropzone.QUEUED;                                                                              // 985
        if (this.options.autoProcessQueue) {                                                                        // 986
          return setTimeout(((function(_this) {                                                                     // 987
            return function() {                                                                                     // 988
              return _this.processQueue();                                                                          // 989
            };                                                                                                      // 990
          })(this)), 0);                                                                                            // 991
        }                                                                                                           // 992
      } else {                                                                                                      // 993
        throw new Error("This file can't be queued because it has already been processed or was rejected.");        // 994
      }                                                                                                             // 995
    };                                                                                                              // 996
                                                                                                                    // 997
    Dropzone.prototype._thumbnailQueue = [];                                                                        // 998
                                                                                                                    // 999
    Dropzone.prototype._processingThumbnail = false;                                                                // 1000
                                                                                                                    // 1001
    Dropzone.prototype._enqueueThumbnail = function(file) {                                                         // 1002
      if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
        this._thumbnailQueue.push(file);                                                                            // 1004
        return setTimeout(((function(_this) {                                                                       // 1005
          return function() {                                                                                       // 1006
            return _this._processThumbnailQueue();                                                                  // 1007
          };                                                                                                        // 1008
        })(this)), 0);                                                                                              // 1009
      }                                                                                                             // 1010
    };                                                                                                              // 1011
                                                                                                                    // 1012
    Dropzone.prototype._processThumbnailQueue = function() {                                                        // 1013
      if (this._processingThumbnail || this._thumbnailQueue.length === 0) {                                         // 1014
        return;                                                                                                     // 1015
      }                                                                                                             // 1016
      this._processingThumbnail = true;                                                                             // 1017
      return this.createThumbnail(this._thumbnailQueue.shift(), (function(_this) {                                  // 1018
        return function() {                                                                                         // 1019
          _this._processingThumbnail = false;                                                                       // 1020
          return _this._processThumbnailQueue();                                                                    // 1021
        };                                                                                                          // 1022
      })(this));                                                                                                    // 1023
    };                                                                                                              // 1024
                                                                                                                    // 1025
    Dropzone.prototype.removeFile = function(file) {                                                                // 1026
      if (file.status === Dropzone.UPLOADING) {                                                                     // 1027
        this.cancelUpload(file);                                                                                    // 1028
      }                                                                                                             // 1029
      this.files = without(this.files, file);                                                                       // 1030
      this.emit("removedfile", file);                                                                               // 1031
      if (this.files.length === 0) {                                                                                // 1032
        return this.emit("reset");                                                                                  // 1033
      }                                                                                                             // 1034
    };                                                                                                              // 1035
                                                                                                                    // 1036
    Dropzone.prototype.removeAllFiles = function(cancelIfNecessary) {                                               // 1037
      var file, _i, _len, _ref;                                                                                     // 1038
      if (cancelIfNecessary == null) {                                                                              // 1039
        cancelIfNecessary = false;                                                                                  // 1040
      }                                                                                                             // 1041
      _ref = this.files.slice();                                                                                    // 1042
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                           // 1043
        file = _ref[_i];                                                                                            // 1044
        if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {                                              // 1045
          this.removeFile(file);                                                                                    // 1046
        }                                                                                                           // 1047
      }                                                                                                             // 1048
      return null;                                                                                                  // 1049
    };                                                                                                              // 1050
                                                                                                                    // 1051
    Dropzone.prototype.createThumbnail = function(file, callback) {                                                 // 1052
      var fileReader;                                                                                               // 1053
      fileReader = new FileReader;                                                                                  // 1054
      fileReader.onload = (function(_this) {                                                                        // 1055
        return function() {                                                                                         // 1056
          if (file.type === "image/svg+xml") {                                                                      // 1057
            _this.emit("thumbnail", file, fileReader.result);                                                       // 1058
            if (callback != null) {                                                                                 // 1059
              callback();                                                                                           // 1060
            }                                                                                                       // 1061
            return;                                                                                                 // 1062
          }                                                                                                         // 1063
          return _this.createThumbnailFromUrl(file, fileReader.result, callback);                                   // 1064
        };                                                                                                          // 1065
      })(this);                                                                                                     // 1066
      return fileReader.readAsDataURL(file);                                                                        // 1067
    };                                                                                                              // 1068
                                                                                                                    // 1069
    Dropzone.prototype.createThumbnailFromUrl = function(file, imageUrl, callback) {                                // 1070
      var img;                                                                                                      // 1071
      img = document.createElement("img");                                                                          // 1072
      img.onload = (function(_this) {                                                                               // 1073
        return function() {                                                                                         // 1074
          var canvas, ctx, resizeInfo, thumbnail, _ref, _ref1, _ref2, _ref3;                                        // 1075
          file.width = img.width;                                                                                   // 1076
          file.height = img.height;                                                                                 // 1077
          resizeInfo = _this.options.resize.call(_this, file);                                                      // 1078
          if (resizeInfo.trgWidth == null) {                                                                        // 1079
            resizeInfo.trgWidth = resizeInfo.optWidth;                                                              // 1080
          }                                                                                                         // 1081
          if (resizeInfo.trgHeight == null) {                                                                       // 1082
            resizeInfo.trgHeight = resizeInfo.optHeight;                                                            // 1083
          }                                                                                                         // 1084
          canvas = document.createElement("canvas");                                                                // 1085
          ctx = canvas.getContext("2d");                                                                            // 1086
          canvas.width = resizeInfo.trgWidth;                                                                       // 1087
          canvas.height = resizeInfo.trgHeight;                                                                     // 1088
          drawImageIOSFix(ctx, img, (_ref = resizeInfo.srcX) != null ? _ref : 0, (_ref1 = resizeInfo.srcY) != null ? _ref1 : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, (_ref2 = resizeInfo.trgX) != null ? _ref2 : 0, (_ref3 = resizeInfo.trgY) != null ? _ref3 : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
          thumbnail = canvas.toDataURL("image/png");                                                                // 1090
          _this.emit("thumbnail", file, thumbnail);                                                                 // 1091
          if (callback != null) {                                                                                   // 1092
            return callback();                                                                                      // 1093
          }                                                                                                         // 1094
        };                                                                                                          // 1095
      })(this);                                                                                                     // 1096
      if (callback != null) {                                                                                       // 1097
        img.onerror = callback;                                                                                     // 1098
      }                                                                                                             // 1099
      return img.src = imageUrl;                                                                                    // 1100
    };                                                                                                              // 1101
                                                                                                                    // 1102
    Dropzone.prototype.processQueue = function() {                                                                  // 1103
      var i, parallelUploads, processingLength, queuedFiles;                                                        // 1104
      parallelUploads = this.options.parallelUploads;                                                               // 1105
      processingLength = this.getUploadingFiles().length;                                                           // 1106
      i = processingLength;                                                                                         // 1107
      if (processingLength >= parallelUploads) {                                                                    // 1108
        return;                                                                                                     // 1109
      }                                                                                                             // 1110
      queuedFiles = this.getQueuedFiles();                                                                          // 1111
      if (!(queuedFiles.length > 0)) {                                                                              // 1112
        return;                                                                                                     // 1113
      }                                                                                                             // 1114
      if (this.options.uploadMultiple) {                                                                            // 1115
        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));                         // 1116
      } else {                                                                                                      // 1117
        while (i < parallelUploads) {                                                                               // 1118
          if (!queuedFiles.length) {                                                                                // 1119
            return;                                                                                                 // 1120
          }                                                                                                         // 1121
          this.processFile(queuedFiles.shift());                                                                    // 1122
          i++;                                                                                                      // 1123
        }                                                                                                           // 1124
      }                                                                                                             // 1125
    };                                                                                                              // 1126
                                                                                                                    // 1127
    Dropzone.prototype.processFile = function(file) {                                                               // 1128
      return this.processFiles([file]);                                                                             // 1129
    };                                                                                                              // 1130
                                                                                                                    // 1131
    Dropzone.prototype.processFiles = function(files) {                                                             // 1132
      var file, _i, _len;                                                                                           // 1133
      for (_i = 0, _len = files.length; _i < _len; _i++) {                                                          // 1134
        file = files[_i];                                                                                           // 1135
        file.processing = true;                                                                                     // 1136
        file.status = Dropzone.UPLOADING;                                                                           // 1137
        this.emit("processing", file);                                                                              // 1138
      }                                                                                                             // 1139
      if (this.options.uploadMultiple) {                                                                            // 1140
        this.emit("processingmultiple", files);                                                                     // 1141
      }                                                                                                             // 1142
      return this.uploadFiles(files);                                                                               // 1143
    };                                                                                                              // 1144
                                                                                                                    // 1145
    Dropzone.prototype._getFilesWithXhr = function(xhr) {                                                           // 1146
      var file, files;                                                                                              // 1147
      return files = (function() {                                                                                  // 1148
        var _i, _len, _ref, _results;                                                                               // 1149
        _ref = this.files;                                                                                          // 1150
        _results = [];                                                                                              // 1151
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                         // 1152
          file = _ref[_i];                                                                                          // 1153
          if (file.xhr === xhr) {                                                                                   // 1154
            _results.push(file);                                                                                    // 1155
          }                                                                                                         // 1156
        }                                                                                                           // 1157
        return _results;                                                                                            // 1158
      }).call(this);                                                                                                // 1159
    };                                                                                                              // 1160
                                                                                                                    // 1161
    Dropzone.prototype.cancelUpload = function(file) {                                                              // 1162
      var groupedFile, groupedFiles, _i, _j, _len, _len1, _ref;                                                     // 1163
      if (file.status === Dropzone.UPLOADING) {                                                                     // 1164
        groupedFiles = this._getFilesWithXhr(file.xhr);                                                             // 1165
        for (_i = 0, _len = groupedFiles.length; _i < _len; _i++) {                                                 // 1166
          groupedFile = groupedFiles[_i];                                                                           // 1167
          groupedFile.status = Dropzone.CANCELED;                                                                   // 1168
        }                                                                                                           // 1169
        file.xhr.abort();                                                                                           // 1170
        for (_j = 0, _len1 = groupedFiles.length; _j < _len1; _j++) {                                               // 1171
          groupedFile = groupedFiles[_j];                                                                           // 1172
          this.emit("canceled", groupedFile);                                                                       // 1173
        }                                                                                                           // 1174
        if (this.options.uploadMultiple) {                                                                          // 1175
          this.emit("canceledmultiple", groupedFiles);                                                              // 1176
        }                                                                                                           // 1177
      } else if ((_ref = file.status) === Dropzone.ADDED || _ref === Dropzone.QUEUED) {                             // 1178
        file.status = Dropzone.CANCELED;                                                                            // 1179
        this.emit("canceled", file);                                                                                // 1180
        if (this.options.uploadMultiple) {                                                                          // 1181
          this.emit("canceledmultiple", [file]);                                                                    // 1182
        }                                                                                                           // 1183
      }                                                                                                             // 1184
      if (this.options.autoProcessQueue) {                                                                          // 1185
        return this.processQueue();                                                                                 // 1186
      }                                                                                                             // 1187
    };                                                                                                              // 1188
                                                                                                                    // 1189
    resolveOption = function() {                                                                                    // 1190
      var args, option;                                                                                             // 1191
      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];                        // 1192
      if (typeof option === 'function') {                                                                           // 1193
        return option.apply(this, args);                                                                            // 1194
      }                                                                                                             // 1195
      return option;                                                                                                // 1196
    };                                                                                                              // 1197
                                                                                                                    // 1198
    Dropzone.prototype.uploadFile = function(file) {                                                                // 1199
      return this.uploadFiles([file]);                                                                              // 1200
    };                                                                                                              // 1201
                                                                                                                    // 1202
    Dropzone.prototype.uploadFiles = function(files) {                                                              // 1203
      var file, formData, handleError, headerName, headerValue, headers, i, input, inputName, inputType, key, method, option, progressObj, response, updateProgress, url, value, xhr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      xhr = new XMLHttpRequest();                                                                                   // 1205
      for (_i = 0, _len = files.length; _i < _len; _i++) {                                                          // 1206
        file = files[_i];                                                                                           // 1207
        file.xhr = xhr;                                                                                             // 1208
      }                                                                                                             // 1209
      method = resolveOption(this.options.method, files);                                                           // 1210
      url = resolveOption(this.options.url, files);                                                                 // 1211
      xhr.open(method, url, true);                                                                                  // 1212
      xhr.withCredentials = !!this.options.withCredentials;                                                         // 1213
      response = null;                                                                                              // 1214
      handleError = (function(_this) {                                                                              // 1215
        return function() {                                                                                         // 1216
          var _j, _len1, _results;                                                                                  // 1217
          _results = [];                                                                                            // 1218
          for (_j = 0, _len1 = files.length; _j < _len1; _j++) {                                                    // 1219
            file = files[_j];                                                                                       // 1220
            _results.push(_this._errorProcessing(files, response || _this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr));
          }                                                                                                         // 1222
          return _results;                                                                                          // 1223
        };                                                                                                          // 1224
      })(this);                                                                                                     // 1225
      updateProgress = (function(_this) {                                                                           // 1226
        return function(e) {                                                                                        // 1227
          var allFilesFinished, progress, _j, _k, _l, _len1, _len2, _len3, _results;                                // 1228
          if (e != null) {                                                                                          // 1229
            progress = 100 * e.loaded / e.total;                                                                    // 1230
            for (_j = 0, _len1 = files.length; _j < _len1; _j++) {                                                  // 1231
              file = files[_j];                                                                                     // 1232
              file.upload = {                                                                                       // 1233
                progress: progress,                                                                                 // 1234
                total: e.total,                                                                                     // 1235
                bytesSent: e.loaded                                                                                 // 1236
              };                                                                                                    // 1237
            }                                                                                                       // 1238
          } else {                                                                                                  // 1239
            allFilesFinished = true;                                                                                // 1240
            progress = 100;                                                                                         // 1241
            for (_k = 0, _len2 = files.length; _k < _len2; _k++) {                                                  // 1242
              file = files[_k];                                                                                     // 1243
              if (!(file.upload.progress === 100 && file.upload.bytesSent === file.upload.total)) {                 // 1244
                allFilesFinished = false;                                                                           // 1245
              }                                                                                                     // 1246
              file.upload.progress = progress;                                                                      // 1247
              file.upload.bytesSent = file.upload.total;                                                            // 1248
            }                                                                                                       // 1249
            if (allFilesFinished) {                                                                                 // 1250
              return;                                                                                               // 1251
            }                                                                                                       // 1252
          }                                                                                                         // 1253
          _results = [];                                                                                            // 1254
          for (_l = 0, _len3 = files.length; _l < _len3; _l++) {                                                    // 1255
            file = files[_l];                                                                                       // 1256
            _results.push(_this.emit("uploadprogress", file, progress, file.upload.bytesSent));                     // 1257
          }                                                                                                         // 1258
          return _results;                                                                                          // 1259
        };                                                                                                          // 1260
      })(this);                                                                                                     // 1261
      xhr.onload = (function(_this) {                                                                               // 1262
        return function(e) {                                                                                        // 1263
          var _ref;                                                                                                 // 1264
          if (files[0].status === Dropzone.CANCELED) {                                                              // 1265
            return;                                                                                                 // 1266
          }                                                                                                         // 1267
          if (xhr.readyState !== 4) {                                                                               // 1268
            return;                                                                                                 // 1269
          }                                                                                                         // 1270
          response = xhr.responseText;                                                                              // 1271
          if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
            try {                                                                                                   // 1273
              response = JSON.parse(response);                                                                      // 1274
            } catch (_error) {                                                                                      // 1275
              e = _error;                                                                                           // 1276
              response = "Invalid JSON response from server.";                                                      // 1277
            }                                                                                                       // 1278
          }                                                                                                         // 1279
          updateProgress();                                                                                         // 1280
          if (!((200 <= (_ref = xhr.status) && _ref < 300))) {                                                      // 1281
            return handleError();                                                                                   // 1282
          } else {                                                                                                  // 1283
            return _this._finished(files, response, e);                                                             // 1284
          }                                                                                                         // 1285
        };                                                                                                          // 1286
      })(this);                                                                                                     // 1287
      xhr.onerror = (function(_this) {                                                                              // 1288
        return function() {                                                                                         // 1289
          if (files[0].status === Dropzone.CANCELED) {                                                              // 1290
            return;                                                                                                 // 1291
          }                                                                                                         // 1292
          return handleError();                                                                                     // 1293
        };                                                                                                          // 1294
      })(this);                                                                                                     // 1295
      progressObj = (_ref = xhr.upload) != null ? _ref : xhr;                                                       // 1296
      progressObj.onprogress = updateProgress;                                                                      // 1297
      headers = {                                                                                                   // 1298
        "Accept": "application/json",                                                                               // 1299
        "Cache-Control": "no-cache",                                                                                // 1300
        "X-Requested-With": "XMLHttpRequest"                                                                        // 1301
      };                                                                                                            // 1302
      if (this.options.headers) {                                                                                   // 1303
        extend(headers, this.options.headers);                                                                      // 1304
      }                                                                                                             // 1305
      for (headerName in headers) {                                                                                 // 1306
        headerValue = headers[headerName];                                                                          // 1307
        xhr.setRequestHeader(headerName, headerValue);                                                              // 1308
      }                                                                                                             // 1309
      formData = new FormData();                                                                                    // 1310
      if (this.options.params) {                                                                                    // 1311
        _ref1 = this.options.params;                                                                                // 1312
        for (key in _ref1) {                                                                                        // 1313
          value = _ref1[key];                                                                                       // 1314
          formData.append(key, value);                                                                              // 1315
        }                                                                                                           // 1316
      }                                                                                                             // 1317
      for (_j = 0, _len1 = files.length; _j < _len1; _j++) {                                                        // 1318
        file = files[_j];                                                                                           // 1319
        this.emit("sending", file, xhr, formData);                                                                  // 1320
      }                                                                                                             // 1321
      if (this.options.uploadMultiple) {                                                                            // 1322
        this.emit("sendingmultiple", files, xhr, formData);                                                         // 1323
      }                                                                                                             // 1324
      if (this.element.tagName === "FORM") {                                                                        // 1325
        _ref2 = this.element.querySelectorAll("input, textarea, select, button");                                   // 1326
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {                                                      // 1327
          input = _ref2[_k];                                                                                        // 1328
          inputName = input.getAttribute("name");                                                                   // 1329
          inputType = input.getAttribute("type");                                                                   // 1330
          if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {                                       // 1331
            _ref3 = input.options;                                                                                  // 1332
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {                                                  // 1333
              option = _ref3[_l];                                                                                   // 1334
              if (option.selected) {                                                                                // 1335
                formData.append(inputName, option.value);                                                           // 1336
              }                                                                                                     // 1337
            }                                                                                                       // 1338
          } else if (!inputType || ((_ref4 = inputType.toLowerCase()) !== "checkbox" && _ref4 !== "radio") || input.checked) {
            formData.append(inputName, input.value);                                                                // 1340
          }                                                                                                         // 1341
        }                                                                                                           // 1342
      }                                                                                                             // 1343
      for (i = _m = 0, _ref5 = files.length - 1; 0 <= _ref5 ? _m <= _ref5 : _m >= _ref5; i = 0 <= _ref5 ? ++_m : --_m) {
        formData.append(this._getParamName(i), files[i], files[i].name);                                            // 1345
      }                                                                                                             // 1346
      return xhr.send(formData);                                                                                    // 1347
    };                                                                                                              // 1348
                                                                                                                    // 1349
    Dropzone.prototype._finished = function(files, responseText, e) {                                               // 1350
      var file, _i, _len;                                                                                           // 1351
      for (_i = 0, _len = files.length; _i < _len; _i++) {                                                          // 1352
        file = files[_i];                                                                                           // 1353
        file.status = Dropzone.SUCCESS;                                                                             // 1354
        this.emit("success", file, responseText, e);                                                                // 1355
        this.emit("complete", file);                                                                                // 1356
      }                                                                                                             // 1357
      if (this.options.uploadMultiple) {                                                                            // 1358
        this.emit("successmultiple", files, responseText, e);                                                       // 1359
        this.emit("completemultiple", files);                                                                       // 1360
      }                                                                                                             // 1361
      if (this.options.autoProcessQueue) {                                                                          // 1362
        return this.processQueue();                                                                                 // 1363
      }                                                                                                             // 1364
    };                                                                                                              // 1365
                                                                                                                    // 1366
    Dropzone.prototype._errorProcessing = function(files, message, xhr) {                                           // 1367
      var file, _i, _len;                                                                                           // 1368
      for (_i = 0, _len = files.length; _i < _len; _i++) {                                                          // 1369
        file = files[_i];                                                                                           // 1370
        file.status = Dropzone.ERROR;                                                                               // 1371
        this.emit("error", file, message, xhr);                                                                     // 1372
        this.emit("complete", file);                                                                                // 1373
      }                                                                                                             // 1374
      if (this.options.uploadMultiple) {                                                                            // 1375
        this.emit("errormultiple", files, message, xhr);                                                            // 1376
        this.emit("completemultiple", files);                                                                       // 1377
      }                                                                                                             // 1378
      if (this.options.autoProcessQueue) {                                                                          // 1379
        return this.processQueue();                                                                                 // 1380
      }                                                                                                             // 1381
    };                                                                                                              // 1382
                                                                                                                    // 1383
    return Dropzone;                                                                                                // 1384
                                                                                                                    // 1385
  })(Emitter);                                                                                                      // 1386
                                                                                                                    // 1387
  Dropzone.version = "4.0.1";                                                                                       // 1388
                                                                                                                    // 1389
  Dropzone.options = {};                                                                                            // 1390
                                                                                                                    // 1391
  Dropzone.optionsForElement = function(element) {                                                                  // 1392
    if (element.getAttribute("id")) {                                                                               // 1393
      return Dropzone.options[camelize(element.getAttribute("id"))];                                                // 1394
    } else {                                                                                                        // 1395
      return void 0;                                                                                                // 1396
    }                                                                                                               // 1397
  };                                                                                                                // 1398
                                                                                                                    // 1399
  Dropzone.instances = [];                                                                                          // 1400
                                                                                                                    // 1401
  Dropzone.forElement = function(element) {                                                                         // 1402
    if (typeof element === "string") {                                                                              // 1403
      element = document.querySelector(element);                                                                    // 1404
    }                                                                                                               // 1405
    if ((element != null ? element.dropzone : void 0) == null) {                                                    // 1406
      throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
    }                                                                                                               // 1408
    return element.dropzone;                                                                                        // 1409
  };                                                                                                                // 1410
                                                                                                                    // 1411
  Dropzone.autoDiscover = false;                                                                                    // 1412
                                                                                                                    // 1413
  Dropzone.discover = function() {                                                                                  // 1414
    var checkElements, dropzone, dropzones, _i, _len, _results;                                                     // 1415
    if (document.querySelectorAll) {                                                                                // 1416
      dropzones = document.querySelectorAll(".dropzone");                                                           // 1417
    } else {                                                                                                        // 1418
      dropzones = [];                                                                                               // 1419
      checkElements = function(elements) {                                                                          // 1420
        var el, _i, _len, _results;                                                                                 // 1421
        _results = [];                                                                                              // 1422
        for (_i = 0, _len = elements.length; _i < _len; _i++) {                                                     // 1423
          el = elements[_i];                                                                                        // 1424
          if (/(^| )dropzone($| )/.test(el.className)) {                                                            // 1425
            _results.push(dropzones.push(el));                                                                      // 1426
          } else {                                                                                                  // 1427
            _results.push(void 0);                                                                                  // 1428
          }                                                                                                         // 1429
        }                                                                                                           // 1430
        return _results;                                                                                            // 1431
      };                                                                                                            // 1432
      checkElements(document.getElementsByTagName("div"));                                                          // 1433
      checkElements(document.getElementsByTagName("form"));                                                         // 1434
    }                                                                                                               // 1435
    _results = [];                                                                                                  // 1436
    for (_i = 0, _len = dropzones.length; _i < _len; _i++) {                                                        // 1437
      dropzone = dropzones[_i];                                                                                     // 1438
      if (Dropzone.optionsForElement(dropzone) !== false) {                                                         // 1439
        _results.push(new Dropzone(dropzone));                                                                      // 1440
      } else {                                                                                                      // 1441
        _results.push(void 0);                                                                                      // 1442
      }                                                                                                             // 1443
    }                                                                                                               // 1444
    return _results;                                                                                                // 1445
  };                                                                                                                // 1446
                                                                                                                    // 1447
  Dropzone.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i];                                                // 1448
                                                                                                                    // 1449
  Dropzone.isBrowserSupported = function() {                                                                        // 1450
    var capableBrowser, regex, _i, _len, _ref;                                                                      // 1451
    capableBrowser = true;                                                                                          // 1452
    if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
      if (!("classList" in document.createElement("a"))) {                                                          // 1454
        capableBrowser = false;                                                                                     // 1455
      } else {                                                                                                      // 1456
        _ref = Dropzone.blacklistedBrowsers;                                                                        // 1457
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                         // 1458
          regex = _ref[_i];                                                                                         // 1459
          if (regex.test(navigator.userAgent)) {                                                                    // 1460
            capableBrowser = false;                                                                                 // 1461
            continue;                                                                                               // 1462
          }                                                                                                         // 1463
        }                                                                                                           // 1464
      }                                                                                                             // 1465
    } else {                                                                                                        // 1466
      capableBrowser = false;                                                                                       // 1467
    }                                                                                                               // 1468
    return capableBrowser;                                                                                          // 1469
  };                                                                                                                // 1470
                                                                                                                    // 1471
  without = function(list, rejectedItem) {                                                                          // 1472
    var item, _i, _len, _results;                                                                                   // 1473
    _results = [];                                                                                                  // 1474
    for (_i = 0, _len = list.length; _i < _len; _i++) {                                                             // 1475
      item = list[_i];                                                                                              // 1476
      if (item !== rejectedItem) {                                                                                  // 1477
        _results.push(item);                                                                                        // 1478
      }                                                                                                             // 1479
    }                                                                                                               // 1480
    return _results;                                                                                                // 1481
  };                                                                                                                // 1482
                                                                                                                    // 1483
  camelize = function(str) {                                                                                        // 1484
    return str.replace(/[\-_](\w)/g, function(match) {                                                              // 1485
      return match.charAt(1).toUpperCase();                                                                         // 1486
    });                                                                                                             // 1487
  };                                                                                                                // 1488
                                                                                                                    // 1489
  Dropzone.createElement = function(string) {                                                                       // 1490
    var div;                                                                                                        // 1491
    div = document.createElement("div");                                                                            // 1492
    div.innerHTML = string;                                                                                         // 1493
    return div.childNodes[0];                                                                                       // 1494
  };                                                                                                                // 1495
                                                                                                                    // 1496
  Dropzone.elementInside = function(element, container) {                                                           // 1497
    if (element === container) {                                                                                    // 1498
      return true;                                                                                                  // 1499
    }                                                                                                               // 1500
    while (element = element.parentNode) {                                                                          // 1501
      if (element === container) {                                                                                  // 1502
        return true;                                                                                                // 1503
      }                                                                                                             // 1504
    }                                                                                                               // 1505
    return false;                                                                                                   // 1506
  };                                                                                                                // 1507
                                                                                                                    // 1508
  Dropzone.getElement = function(el, name) {                                                                        // 1509
    var element;                                                                                                    // 1510
    if (typeof el === "string") {                                                                                   // 1511
      element = document.querySelector(el);                                                                         // 1512
    } else if (el.nodeType != null) {                                                                               // 1513
      element = el;                                                                                                 // 1514
    }                                                                                                               // 1515
    if (element == null) {                                                                                          // 1516
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
    }                                                                                                               // 1518
    return element;                                                                                                 // 1519
  };                                                                                                                // 1520
                                                                                                                    // 1521
  Dropzone.getElements = function(els, name) {                                                                      // 1522
    var e, el, elements, _i, _j, _len, _len1, _ref;                                                                 // 1523
    if (els instanceof Array) {                                                                                     // 1524
      elements = [];                                                                                                // 1525
      try {                                                                                                         // 1526
        for (_i = 0, _len = els.length; _i < _len; _i++) {                                                          // 1527
          el = els[_i];                                                                                             // 1528
          elements.push(this.getElement(el, name));                                                                 // 1529
        }                                                                                                           // 1530
      } catch (_error) {                                                                                            // 1531
        e = _error;                                                                                                 // 1532
        elements = null;                                                                                            // 1533
      }                                                                                                             // 1534
    } else if (typeof els === "string") {                                                                           // 1535
      elements = [];                                                                                                // 1536
      _ref = document.querySelectorAll(els);                                                                        // 1537
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {                                                         // 1538
        el = _ref[_j];                                                                                              // 1539
        elements.push(el);                                                                                          // 1540
      }                                                                                                             // 1541
    } else if (els.nodeType != null) {                                                                              // 1542
      elements = [els];                                                                                             // 1543
    }                                                                                                               // 1544
    if (!((elements != null) && elements.length)) {                                                                 // 1545
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
    }                                                                                                               // 1547
    return elements;                                                                                                // 1548
  };                                                                                                                // 1549
                                                                                                                    // 1550
  Dropzone.confirm = function(question, accepted, rejected) {                                                       // 1551
    if (window.confirm(question)) {                                                                                 // 1552
      return accepted();                                                                                            // 1553
    } else if (rejected != null) {                                                                                  // 1554
      return rejected();                                                                                            // 1555
    }                                                                                                               // 1556
  };                                                                                                                // 1557
                                                                                                                    // 1558
  Dropzone.isValidFile = function(file, acceptedFiles) {                                                            // 1559
    var baseMimeType, mimeType, validType, _i, _len;                                                                // 1560
    if (!acceptedFiles) {                                                                                           // 1561
      return true;                                                                                                  // 1562
    }                                                                                                               // 1563
    acceptedFiles = acceptedFiles.split(",");                                                                       // 1564
    mimeType = file.type;                                                                                           // 1565
    baseMimeType = mimeType.replace(/\/.*$/, "");                                                                   // 1566
    for (_i = 0, _len = acceptedFiles.length; _i < _len; _i++) {                                                    // 1567
      validType = acceptedFiles[_i];                                                                                // 1568
      validType = validType.trim();                                                                                 // 1569
      if (validType.charAt(0) === ".") {                                                                            // 1570
        if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) { // 1571
          return true;                                                                                              // 1572
        }                                                                                                           // 1573
      } else if (/\/\*$/.test(validType)) {                                                                         // 1574
        if (baseMimeType === validType.replace(/\/.*$/, "")) {                                                      // 1575
          return true;                                                                                              // 1576
        }                                                                                                           // 1577
      } else {                                                                                                      // 1578
        if (mimeType === validType) {                                                                               // 1579
          return true;                                                                                              // 1580
        }                                                                                                           // 1581
      }                                                                                                             // 1582
    }                                                                                                               // 1583
    return false;                                                                                                   // 1584
  };                                                                                                                // 1585
                                                                                                                    // 1586
  if (typeof jQuery !== "undefined" && jQuery !== null) {                                                           // 1587
    jQuery.fn.dropzone = function(options) {                                                                        // 1588
      return this.each(function() {                                                                                 // 1589
        return new Dropzone(this, options);                                                                         // 1590
      });                                                                                                           // 1591
    };                                                                                                              // 1592
  }                                                                                                                 // 1593
                                                                                                                    // 1594
  if (typeof module !== "undefined" && module !== null) {                                                           // 1595
    module.exports = Dropzone;                                                                                      // 1596
  } else {                                                                                                          // 1597
    window.Dropzone = Dropzone;                                                                                     // 1598
  }                                                                                                                 // 1599
                                                                                                                    // 1600
  Dropzone.ADDED = "added";                                                                                         // 1601
                                                                                                                    // 1602
  Dropzone.QUEUED = "queued";                                                                                       // 1603
                                                                                                                    // 1604
  Dropzone.ACCEPTED = Dropzone.QUEUED;                                                                              // 1605
                                                                                                                    // 1606
  Dropzone.UPLOADING = "uploading";                                                                                 // 1607
                                                                                                                    // 1608
  Dropzone.PROCESSING = Dropzone.UPLOADING;                                                                         // 1609
                                                                                                                    // 1610
  Dropzone.CANCELED = "canceled";                                                                                   // 1611
                                                                                                                    // 1612
  Dropzone.ERROR = "error";                                                                                         // 1613
                                                                                                                    // 1614
  Dropzone.SUCCESS = "success";                                                                                     // 1615
                                                                                                                    // 1616
                                                                                                                    // 1617
  /*                                                                                                                // 1618
                                                                                                                    // 1619
  Bugfix for iOS 6 and 7                                                                                            // 1620
  Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios                          // 1621
  based on the work of https://github.com/stomita/ios-imagefile-megapixel                                           // 1622
   */                                                                                                               // 1623
                                                                                                                    // 1624
  detectVerticalSquash = function(img) {                                                                            // 1625
    var alpha, canvas, ctx, data, ey, ih, iw, py, ratio, sy;                                                        // 1626
    iw = img.naturalWidth;                                                                                          // 1627
    ih = img.naturalHeight;                                                                                         // 1628
    canvas = document.createElement("canvas");                                                                      // 1629
    canvas.width = 1;                                                                                               // 1630
    canvas.height = ih;                                                                                             // 1631
    ctx = canvas.getContext("2d");                                                                                  // 1632
    ctx.drawImage(img, 0, 0);                                                                                       // 1633
    data = ctx.getImageData(0, 0, 1, ih).data;                                                                      // 1634
    sy = 0;                                                                                                         // 1635
    ey = ih;                                                                                                        // 1636
    py = ih;                                                                                                        // 1637
    while (py > sy) {                                                                                               // 1638
      alpha = data[(py - 1) * 4 + 3];                                                                               // 1639
      if (alpha === 0) {                                                                                            // 1640
        ey = py;                                                                                                    // 1641
      } else {                                                                                                      // 1642
        sy = py;                                                                                                    // 1643
      }                                                                                                             // 1644
      py = (ey + sy) >> 1;                                                                                          // 1645
    }                                                                                                               // 1646
    ratio = py / ih;                                                                                                // 1647
    if (ratio === 0) {                                                                                              // 1648
      return 1;                                                                                                     // 1649
    } else {                                                                                                        // 1650
      return ratio;                                                                                                 // 1651
    }                                                                                                               // 1652
  };                                                                                                                // 1653
                                                                                                                    // 1654
  drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {                                            // 1655
    var vertSquashRatio;                                                                                            // 1656
    vertSquashRatio = detectVerticalSquash(img);                                                                    // 1657
    return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);                                    // 1658
  };                                                                                                                // 1659
                                                                                                                    // 1660
                                                                                                                    // 1661
  /*                                                                                                                // 1662
   * contentloaded.js                                                                                               // 1663
   *                                                                                                                // 1664
   * Author: Diego Perini (diego.perini at gmail.com)                                                               // 1665
   * Summary: cross-browser wrapper for DOMContentLoaded                                                            // 1666
   * Updated: 20101020                                                                                              // 1667
   * License: MIT                                                                                                   // 1668
   * Version: 1.2                                                                                                   // 1669
   *                                                                                                                // 1670
   * URL:                                                                                                           // 1671
   * http://javascript.nwbox.com/ContentLoaded/                                                                     // 1672
   * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE                                                          // 1673
   */                                                                                                               // 1674
                                                                                                                    // 1675
  contentLoaded = function(win, fn) {                                                                               // 1676
    var add, doc, done, init, poll, pre, rem, root, top;                                                            // 1677
    done = false;                                                                                                   // 1678
    top = true;                                                                                                     // 1679
    doc = win.document;                                                                                             // 1680
    root = doc.documentElement;                                                                                     // 1681
    add = (doc.addEventListener ? "addEventListener" : "attachEvent");                                              // 1682
    rem = (doc.addEventListener ? "removeEventListener" : "detachEvent");                                           // 1683
    pre = (doc.addEventListener ? "" : "on");                                                                       // 1684
    init = function(e) {                                                                                            // 1685
      if (e.type === "readystatechange" && doc.readyState !== "complete") {                                         // 1686
        return;                                                                                                     // 1687
      }                                                                                                             // 1688
      (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);                                              // 1689
      if (!done && (done = true)) {                                                                                 // 1690
        return fn.call(win, e.type || e);                                                                           // 1691
      }                                                                                                             // 1692
    };                                                                                                              // 1693
    poll = function() {                                                                                             // 1694
      var e;                                                                                                        // 1695
      try {                                                                                                         // 1696
        root.doScroll("left");                                                                                      // 1697
      } catch (_error) {                                                                                            // 1698
        e = _error;                                                                                                 // 1699
        setTimeout(poll, 50);                                                                                       // 1700
        return;                                                                                                     // 1701
      }                                                                                                             // 1702
      return init("poll");                                                                                          // 1703
    };                                                                                                              // 1704
    if (doc.readyState !== "complete") {                                                                            // 1705
      if (doc.createEventObject && root.doScroll) {                                                                 // 1706
        try {                                                                                                       // 1707
          top = !win.frameElement;                                                                                  // 1708
        } catch (_error) {}                                                                                         // 1709
        if (top) {                                                                                                  // 1710
          poll();                                                                                                   // 1711
        }                                                                                                           // 1712
      }                                                                                                             // 1713
      doc[add](pre + "DOMContentLoaded", init, false);                                                              // 1714
      doc[add](pre + "readystatechange", init, false);                                                              // 1715
      return win[add](pre + "load", init, false);                                                                   // 1716
    }                                                                                                               // 1717
  };                                                                                                                // 1718
                                                                                                                    // 1719
  Dropzone._autoDiscoverFunction = function() {                                                                     // 1720
    if (Dropzone.autoDiscover) {                                                                                    // 1721
      return Dropzone.discover();                                                                                   // 1722
    }                                                                                                               // 1723
  };                                                                                                                // 1724
                                                                                                                    // 1725
  contentLoaded(window, Dropzone._autoDiscoverFunction);                                                            // 1726
                                                                                                                    // 1727
}).call(this);                                                                                                      // 1728
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/dbarrett:dropzonejs/lib/template.dbarrett:dropzonejs.js                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("dropzone");                                                                                   // 2
Template["dropzone"] = new Template("Template.dropzone", (function() {                                              // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    id: function() {                                                                                                // 6
      return Spacebars.mustache(view.lookup("id"));                                                                 // 7
    },                                                                                                              // 8
    "class": "dropzone"                                                                                             // 9
  });                                                                                                               // 10
}));                                                                                                                // 11
                                                                                                                    // 12
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/dbarrett:dropzonejs/lib/dbarrett:dropzonejs.js                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Template.dropzone.onRendered( function () {                                                                         // 1
  var options = _.extend( {}, Meteor.Dropzone.options, this.data );                                                 // 2
  if ( this.data.id ) {                                                                                             // 3
    this.dropzone = new Dropzone( '#' + this.data.id + '.dropzone', options );                                      // 4
  } else {                                                                                                          // 5
    this.$('.dropzone').dropzone( options );                                                                        // 6
  }                                                                                                                 // 7
} );                                                                                                                // 8
                                                                                                                    // 9
Meteor.Dropzone = {                                                                                                 // 10
  options: {                                                                                                        // 11
                                                                                                                    // 12
  }                                                                                                                 // 13
};                                                                                                                  // 14
                                                                                                                    // 15
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['dbarrett:dropzonejs'] = {};

})();
