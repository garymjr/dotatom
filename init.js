const { BufferedProcess } = require('atom');

const $apm = atom.packages.getApmPath();

const packageInstalled = (package) => {
  if (atom.packages.resolvePackagePath(package)) {
    return true;
  }
  return false;
};

const installPackage = (package) => {
  const process = new BufferedProcess({
    command: $apm,
    args: ['install', package],
    stdout: (output) => console.log(output),
    exit: (code) => {
      if (code === 0) {
        atom.notifications.addSuccess(`${package} installed successfully`);
      } else {
        atom.notifications.addError(`Error while installing ${package}`);
      }
    }
  });
};

const installedPackages = [
  'atom-ternjs',
  'autocomplete-python',
  'ex-mode',
  'language-babel',
  'narrow',
  'vim-mode-plus',
  'zentabs'
];

installedPackages.forEach(package => {
  if (!packageInstalled(package)) {
    installPackage(package);
  }
});
