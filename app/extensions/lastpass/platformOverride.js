(function(a){a.checkBrowserPasswordManager=function(b){chrome.privacy&&(chrome.privacy.services&&chrome.privacy.services.passwordSavingEnabled)&&chrome.privacy.services.passwordSavingEnabled.get({},function(a){a.value&&"controllable_by_this_extension"===a.levelOfControl&&b()})};a.setupDropdownImportMenu_single=a.setupDropdownImportMenu;a.setupDropdownImportMenu=function(b){bg.is_opera_chromium()?a.setupDropdownImportMenu_single(b):($("#chromeImportMenuItem").bind("click",function(){bg.lpevent("m_igoo");
bg.openimportchrome()}),$("#importMenuItem").bind("click",function(){bg.lpevent("m_i");bg.openimport()}))};a.canBackgroundOpenPopover=function(){return!1};a.showVaultToggleDialog=function(){};var c=a.getUnavailablePreferences;a.getUnavailablePreferences=function(){var a=c();a.enablenewlogin=!bg.g_shownewloginoption;a.hidecontextspan=void 0===chrome.contextMenus;return a};var d=a.getPreferencesRequiringBinary;a.getPreferencesRequiringBinary=function(){var a=d();a.idleLogoffVal=void 0===chrome.idle;
return a};var e=a.handlePreferenceChanges;a.handlePreferenceChanges=function(a){e(a);void 0!==a.hideContextMenus&&bg.createContextMenus();!1===a.showmatchingbadge&&bg.clear_badge_text()}})(LPPlatform);