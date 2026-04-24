## [1.3.0](https://github.com/masmuss/applyst/compare/v1.2.0...v1.3.0) (2026-04-24)

### Features

* add trustProxies middleware configuration for enhanced proxy handling ([7642255](https://github.com/masmuss/applyst/commit/7642255785585fcf36fbf77b97fc5f830e3f558f))

## [1.2.0](https://github.com/masmuss/applyst/compare/v1.1.0...v1.2.0) (2026-04-24)

### Features

* enhance release workflow to support dynamic platform selection for Docker builds ([3143338](https://github.com/masmuss/applyst/commit/3143338a25b2f3aaaf47e148265183a624ce8ce0))

## [1.1.0](https://github.com/masmuss/applyst/compare/v1.0.1...v1.1.0) (2026-04-24)

### Features

* add QEMU setup step and specify platforms for Docker build ([1796090](https://github.com/masmuss/applyst/commit/1796090fc816a3d4af0a240c81b43e8e805d85aa))

## [1.0.1](https://github.com/masmuss/applyst/compare/v1.0.0...v1.0.1) (2026-04-24)

### Bug Fixes

* update semantic-release action and Docker actions to latest versions ([540ace1](https://github.com/masmuss/applyst/commit/540ace158792bd0cb56383742079dfa8a8ecf134))

## 1.0.0 (2026-04-24)

### Features

* add advanced table functionality with sorting and pagination ([e90d9b6](https://github.com/masmuss/applyst/commit/e90d9b6ccc665e811da52fa58d08e507ba6ff366))
* Add command palette, magic badge, and magic card components ([e4d486f](https://github.com/masmuss/applyst/commit/e4d486f66eed62a5afca521aac58015b5b2625e1))
* add controllers, models, requests, policies, factories, migrations, and seeders for job applications and reminders ([ef196f6](https://github.com/masmuss/applyst/commit/ef196f6d01f2e366aa980da306e3e75a32781487))
* add dashboard components for empty state, recent applications, and follow-up alert with improved utility functions ([4c2ef35](https://github.com/masmuss/applyst/commit/4c2ef35ba2deafe683d6280d10986b20687772be))
* add DashboardStatCard and RecentApplicationRow components with associated types for improved dashboard functionality ([be0048b](https://github.com/masmuss/applyst/commit/be0048b600d02bab9a9f5f0fd83185fed382999a))
* add Docker support and Octane configuration; include scripts for changelog generation and version tagging ([bcce71c](https://github.com/masmuss/applyst/commit/bcce71cf7fb5066ce8feb0648f9ca474e2f4d21f))
* add job application delete dialog and related functionality with tests ([894838d](https://github.com/masmuss/applyst/commit/894838d2eec978b000a8b328624125e33266e3c6))
* add job application update dialog and related functionality with tests ([e2aedf4](https://github.com/masmuss/applyst/commit/e2aedf4d1cca5b4711e5bdb8351708c9b1d537c3))
* add job applications overview and table components ([e1eeaff](https://github.com/masmuss/applyst/commit/e1eeaff264ddd4ff9d06156e46610a867ca8b1fc))
* add JobApplicationActionsMenu component for managing job applications ([43d88cd](https://github.com/masmuss/applyst/commit/43d88cd52b7eef35affa6c4d375a0d452c11d6be))
* add landing page and add feature test for landing page rendering ([57c6820](https://github.com/masmuss/applyst/commit/57c6820f6823d08c5b8fafd0559dbfaf5bfa6711))
* add lefthook configuration for pre-commit and pre-push hooks, and update package dependencies ([d409951](https://github.com/masmuss/applyst/commit/d409951e8e1c7451ab1a58a722d90ed6e4bab551))
* add semantic release configuration and GitHub Actions workflow for image release ([d0d4ac5](https://github.com/masmuss/applyst/commit/d0d4ac5ffbe7b8dd7da9941c38be92b39bdd6445))
* add tightenco/ziggy package and implement useTableFilters hook for enhanced filtering in job applications ([fa0d8dc](https://github.com/masmuss/applyst/commit/fa0d8dc4a11e999f3de4ee00a8894aa6d132be9a))
* enhance job applications index layout with CardAction for create dialog ([e415521](https://github.com/masmuss/applyst/commit/e4155212c97f78cd7d49a2a1df7ff04a82b02dd0))
* enhance JobApplicationsFilters component with description for improved user guidance ([7d02426](https://github.com/masmuss/applyst/commit/7d0242690bef669a50b1518e96d967a9e03928f6))
* enhance landing components by refining styles and removing unnecessary props ([82e32b3](https://github.com/masmuss/applyst/commit/82e32b367930cc03f98bf979acd7ba271abfb68f))
* enhance landing components with improved styling and layout adjustments ([bca3a78](https://github.com/masmuss/applyst/commit/bca3a7888b053edceebccab436dda4f651b9bafc))
* enhance pagination handling and add routePath prop to DataTable and JobApplicationsTable components ([c2a892a](https://github.com/masmuss/applyst/commit/c2a892a234e2d24036933b0fc08ef6dd38ef67ae))
* implement application status logging and seeding; add tests for status progression ([5818e7a](https://github.com/masmuss/applyst/commit/5818e7a7ccc356fcbe911aeeef9ee5dcbb988fca))
* implement DashboardController and associated dashboard view with application statistics ([6b57dff](https://github.com/masmuss/applyst/commit/6b57dffc7fb2ae883f249f560d1de2739978ff44))
* implement job application creation and management features with status handling and UI enhancements ([7d6ba95](https://github.com/masmuss/applyst/commit/7d6ba955c07793a3f655d1b634aa80f129e2f50d))
* implement job application detail view with status timeline and related tests ([3e63f5f](https://github.com/masmuss/applyst/commit/3e63f5fa9b6bee5bf587fc61961adfc22ee91242))
* implement job application details page with hero, notes panel, and timeline components ([66c7c6f](https://github.com/masmuss/applyst/commit/66c7c6f8c0a033370e0175505e51b78ede3f826e))
* implement JobApplicationStatus enum and update related components for improved status management ([3356011](https://github.com/masmuss/applyst/commit/33560112d704da213fb082fe18f30f8895a2dc7c))
* implement landing browser preview components; add header, stats, and table for enhanced application overview ([4243252](https://github.com/masmuss/applyst/commit/4243252a6b4194d09a6719e522b0490c46f84cde))
* initial commit ([ba667b1](https://github.com/masmuss/applyst/commit/ba667b113da9bf304ce53352895358a91fb11104))
* integrate InputGroup component into JobApplicationsFilters for enhanced search functionality ([fbce6c2](https://github.com/masmuss/applyst/commit/fbce6c252ec9114045a8d4d5b638627f18821705))
* refactor job application forms to use JobApplicationFormFields component for better code reuse ([ccdb3f6](https://github.com/masmuss/applyst/commit/ccdb3f63c2fb15b21e9a0dbc4f5ed14c2c2ad7bd))
* refactor landing browser preview to use JobApplicationStatusBadge and improve traffic light rendering ([d9e097e](https://github.com/masmuss/applyst/commit/d9e097e440a8227f059b8ca8a7d6724dc9854701))
* refactor navigation structure by consolidating main and utility nav items into app-navigation component ([7148f79](https://github.com/masmuss/applyst/commit/7148f798004883340d5f417fee22ef2708e07896))
* simplify app header and sidebar by removing utility navigation items ([22dcccb](https://github.com/masmuss/applyst/commit/22dcccb5c6d449efa2808904071a423d9724177d))
* translate landing page components and update text for clarity ([b0f93fa](https://github.com/masmuss/applyst/commit/b0f93fa3cfa827fbfff0d6e2571fb1b3dd7a9655))
* update application name to 'applyst' in configuration and UI components ([f3e5e54](https://github.com/masmuss/applyst/commit/f3e5e545f05caf53dba9fc55c856e3d7dbdbf063))
* update AppLogo component to support variant prop; adjust styles in AppHeader and LandingFooter for consistency ([0438256](https://github.com/masmuss/applyst/commit/04382562272202f14277a3277c47397972d086b8))
* update color variables for improved accessibility and enhance text readability in landing components ([07bb7e1](https://github.com/masmuss/applyst/commit/07bb7e15c310e6783a0cfae292b1c41de8dd7e22))
* update component styles and structure; add Figtree font support and improve accessibility ([b8a0a76](https://github.com/masmuss/applyst/commit/b8a0a765c8589d745b0bf82e987284a0bb10dbe7))
* update database seeders to use firstOrCreate for user and add multiple job applications ([d911098](https://github.com/masmuss/applyst/commit/d91109815bea3c006dc30be103f16d129efeec5e))
* update favicon and logo assets; enhance app header and footer components ([6bbf1cf](https://github.com/masmuss/applyst/commit/6bbf1cf5946a251837a3b4da1c54549b4376232c))
* update job application summary structure and enhance filters functionality ([e588471](https://github.com/masmuss/applyst/commit/e588471208e191f12d85c2d8496f52e338670026))
* update landing browser preview to use a table layout for applications and enhance landing CTA section styling ([7484104](https://github.com/masmuss/applyst/commit/74841040dc7e0e7a3bcdda302d24a3c095acb023))
* update text color variables for improved consistency across landing components ([e208576](https://github.com/masmuss/applyst/commit/e208576ef6fbdae7a210c1a057621bcb9b512684))

### Bug Fixes

* remove duplicate import statements for icons in JobApplicationsOverview component ([161dba9](https://github.com/masmuss/applyst/commit/161dba918d24e4ca889199a97308d2a82760dc49))
* restructure Dockerfile for multi-stage builds; optimize PHP and Node.js installation ([bca803d](https://github.com/masmuss/applyst/commit/bca803dc4f5baa9dfd332918481ef7b00fd9742c))
* standardize import quotes and improve formatting in CSS and TypeScript files ([9d91680](https://github.com/masmuss/applyst/commit/9d91680b58fb5509782a0913ad31478a81785a8d))
* update AppLogoIcon text color and adjust layout width for responsiveness ([8d84f79](https://github.com/masmuss/applyst/commit/8d84f796eb5323643182b7d5fef85bc17b785298))
* update filterable source field to use 'like' for improved searching ([71d1cba](https://github.com/masmuss/applyst/commit/71d1cba7669ec859eb25511005a8d6f4ecaf2cd9))
* update healthcheck command and enforce APP_KEY requirement in entrypoint script ([5c906a6](https://github.com/masmuss/applyst/commit/5c906a6a15c8c9754a29068719623ece88a1f178))
* update import statement for AppLayoutTemplate to use app-header-layout ([0234f64](https://github.com/masmuss/applyst/commit/0234f64e1cbd9fbd1247f1556861d8a7683d1895))
* update PHP version requirement to ^8.4 in composer.json and adjust CI matrix in tests.yml ([7ce20e8](https://github.com/masmuss/applyst/commit/7ce20e81f79c9e644b89a552dd57acc2a2362992))
