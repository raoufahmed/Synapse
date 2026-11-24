import { initThemeLang } from './modules/theme-lang.js';
import { initNavigation } from './modules/navigation.js';
import { initHeroRail } from './modules/hero-rail.js';
import { initCommittees } from './modules/committees.js';
import { initEvents } from './modules/events.js';
import { initLightbox } from './modules/lightbox.js';
import { initVideos } from './modules/videos.js';

// <script type="module"> is deferred, so the DOM is fully parsed before any of this runs.
initThemeLang();
initNavigation();
initHeroRail();
initCommittees();
initEvents();
initLightbox();
initVideos();
