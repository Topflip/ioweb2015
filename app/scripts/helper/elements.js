/**
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

IOWA.Elements = (function() {

  "use strict";

  var toast = document.getElementById('toast');

  var drawer = document.querySelector('core-drawer-panel');
  drawer.addEventListener('core-activate', function(e) {
    this.closeDrawer();
  });

  var template = document.getElementById('t');
  template.pages = {};
  template.selectedPage = 'home';

  var cyan = '#00BCD4';
  var mediumGrey = '#CFD8DC';
  var darkGrey = '#455A64';

  template.pages = {
    'schedule': {
      mastheadBgClass: cyan
    },
    'home': {
      mastheadBgClass: mediumGrey
    },
    'about': {
      mastheadBgClass: darkGrey
    },
    'onsite': {
      mastheadBgClass: darkGrey
    },
    'offsite': {
      mastheadBgClass: cyan
    },
    'registration': {
      mastheadBgClass: cyan
    }
  };

  var ripple = document.querySelector('.masthead__ripple__content');

  return {
    Drawer: drawer,
    Template: template,
    Toast: toast,
    Ripple: ripple
  };

})();

