'use strict';

export default function logger (options, name, variable) {
  if (options.debug) {
    console.info('==DataTabs==');
    console.log(name);
    if (variable) {
      console.log(variable);
    }
    console.log('///////////////////');
    console.log('///DataTabs///////');
    console.log('/////////////////');
  }
};
