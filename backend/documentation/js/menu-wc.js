'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-9d538656feb682c58fd4f946b77dc46d1fbd707f3c1b79a1101b24d2a102fea9f4e2a00a11cde91075ab57624066de4b83d6946ed2ce605547fe8dc69f318ed0"' : 'data-bs-target="#xs-controllers-links-module-AppModule-9d538656feb682c58fd4f946b77dc46d1fbd707f3c1b79a1101b24d2a102fea9f4e2a00a11cde91075ab57624066de4b83d6946ed2ce605547fe8dc69f318ed0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-9d538656feb682c58fd4f946b77dc46d1fbd707f3c1b79a1101b24d2a102fea9f4e2a00a11cde91075ab57624066de4b83d6946ed2ce605547fe8dc69f318ed0"' :
                                            'id="xs-controllers-links-module-AppModule-9d538656feb682c58fd4f946b77dc46d1fbd707f3c1b79a1101b24d2a102fea9f4e2a00a11cde91075ab57624066de4b83d6946ed2ce605547fe8dc69f318ed0"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-9d538656feb682c58fd4f946b77dc46d1fbd707f3c1b79a1101b24d2a102fea9f4e2a00a11cde91075ab57624066de4b83d6946ed2ce605547fe8dc69f318ed0"' : 'data-bs-target="#xs-injectables-links-module-AppModule-9d538656feb682c58fd4f946b77dc46d1fbd707f3c1b79a1101b24d2a102fea9f4e2a00a11cde91075ab57624066de4b83d6946ed2ce605547fe8dc69f318ed0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-9d538656feb682c58fd4f946b77dc46d1fbd707f3c1b79a1101b24d2a102fea9f4e2a00a11cde91075ab57624066de4b83d6946ed2ce605547fe8dc69f318ed0"' :
                                        'id="xs-injectables-links-module-AppModule-9d538656feb682c58fd4f946b77dc46d1fbd707f3c1b79a1101b24d2a102fea9f4e2a00a11cde91075ab57624066de4b83d6946ed2ce605547fe8dc69f318ed0"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-5ee986618848fc47f43ac4e82fa3fc2b1098e8dab4805c151747d00c8c18241f53fd5d99f60c476af3bf2b0ea0446f61d8b50c7a8bd7813a20486a47c07e751b"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-5ee986618848fc47f43ac4e82fa3fc2b1098e8dab4805c151747d00c8c18241f53fd5d99f60c476af3bf2b0ea0446f61d8b50c7a8bd7813a20486a47c07e751b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5ee986618848fc47f43ac4e82fa3fc2b1098e8dab4805c151747d00c8c18241f53fd5d99f60c476af3bf2b0ea0446f61d8b50c7a8bd7813a20486a47c07e751b"' :
                                            'id="xs-controllers-links-module-AuthModule-5ee986618848fc47f43ac4e82fa3fc2b1098e8dab4805c151747d00c8c18241f53fd5d99f60c476af3bf2b0ea0446f61d8b50c7a8bd7813a20486a47c07e751b"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-5ee986618848fc47f43ac4e82fa3fc2b1098e8dab4805c151747d00c8c18241f53fd5d99f60c476af3bf2b0ea0446f61d8b50c7a8bd7813a20486a47c07e751b"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-5ee986618848fc47f43ac4e82fa3fc2b1098e8dab4805c151747d00c8c18241f53fd5d99f60c476af3bf2b0ea0446f61d8b50c7a8bd7813a20486a47c07e751b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5ee986618848fc47f43ac4e82fa3fc2b1098e8dab4805c151747d00c8c18241f53fd5d99f60c476af3bf2b0ea0446f61d8b50c7a8bd7813a20486a47c07e751b"' :
                                        'id="xs-injectables-links-module-AuthModule-5ee986618848fc47f43ac4e82fa3fc2b1098e8dab4805c151747d00c8c18241f53fd5d99f60c476af3bf2b0ea0446f61d8b50c7a8bd7813a20486a47c07e751b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BranchesModule.html" data-type="entity-link" >BranchesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BranchesModule-25f8fc73613f923878c743bf34b3df6d376b9aa75fea1e7653acf3b5b02b77fba18adff5d770857b976268166a2b897c2b1639bfe2d1d2964830dca1dbdb2758"' : 'data-bs-target="#xs-controllers-links-module-BranchesModule-25f8fc73613f923878c743bf34b3df6d376b9aa75fea1e7653acf3b5b02b77fba18adff5d770857b976268166a2b897c2b1639bfe2d1d2964830dca1dbdb2758"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BranchesModule-25f8fc73613f923878c743bf34b3df6d376b9aa75fea1e7653acf3b5b02b77fba18adff5d770857b976268166a2b897c2b1639bfe2d1d2964830dca1dbdb2758"' :
                                            'id="xs-controllers-links-module-BranchesModule-25f8fc73613f923878c743bf34b3df6d376b9aa75fea1e7653acf3b5b02b77fba18adff5d770857b976268166a2b897c2b1639bfe2d1d2964830dca1dbdb2758"' }>
                                            <li class="link">
                                                <a href="controllers/BranchesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BranchesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BranchesModule-25f8fc73613f923878c743bf34b3df6d376b9aa75fea1e7653acf3b5b02b77fba18adff5d770857b976268166a2b897c2b1639bfe2d1d2964830dca1dbdb2758"' : 'data-bs-target="#xs-injectables-links-module-BranchesModule-25f8fc73613f923878c743bf34b3df6d376b9aa75fea1e7653acf3b5b02b77fba18adff5d770857b976268166a2b897c2b1639bfe2d1d2964830dca1dbdb2758"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BranchesModule-25f8fc73613f923878c743bf34b3df6d376b9aa75fea1e7653acf3b5b02b77fba18adff5d770857b976268166a2b897c2b1639bfe2d1d2964830dca1dbdb2758"' :
                                        'id="xs-injectables-links-module-BranchesModule-25f8fc73613f923878c743bf34b3df6d376b9aa75fea1e7653acf3b5b02b77fba18adff5d770857b976268166a2b897c2b1639bfe2d1d2964830dca1dbdb2758"' }>
                                        <li class="link">
                                            <a href="injectables/BranchesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BranchesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardsModule.html" data-type="entity-link" >CardsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CardsModule-bcd737d2127d1c2bc79c2957302ada137b6268d9d83c0d98fdfb3961ca240c77aaa3bfc3a9bec75d55fb6a34584e113be8b1a0f5bdac4d594fff3092b78a28d5"' : 'data-bs-target="#xs-controllers-links-module-CardsModule-bcd737d2127d1c2bc79c2957302ada137b6268d9d83c0d98fdfb3961ca240c77aaa3bfc3a9bec75d55fb6a34584e113be8b1a0f5bdac4d594fff3092b78a28d5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CardsModule-bcd737d2127d1c2bc79c2957302ada137b6268d9d83c0d98fdfb3961ca240c77aaa3bfc3a9bec75d55fb6a34584e113be8b1a0f5bdac4d594fff3092b78a28d5"' :
                                            'id="xs-controllers-links-module-CardsModule-bcd737d2127d1c2bc79c2957302ada137b6268d9d83c0d98fdfb3961ca240c77aaa3bfc3a9bec75d55fb6a34584e113be8b1a0f5bdac4d594fff3092b78a28d5"' }>
                                            <li class="link">
                                                <a href="controllers/CardsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CardsModule-bcd737d2127d1c2bc79c2957302ada137b6268d9d83c0d98fdfb3961ca240c77aaa3bfc3a9bec75d55fb6a34584e113be8b1a0f5bdac4d594fff3092b78a28d5"' : 'data-bs-target="#xs-injectables-links-module-CardsModule-bcd737d2127d1c2bc79c2957302ada137b6268d9d83c0d98fdfb3961ca240c77aaa3bfc3a9bec75d55fb6a34584e113be8b1a0f5bdac4d594fff3092b78a28d5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CardsModule-bcd737d2127d1c2bc79c2957302ada137b6268d9d83c0d98fdfb3961ca240c77aaa3bfc3a9bec75d55fb6a34584e113be8b1a0f5bdac4d594fff3092b78a28d5"' :
                                        'id="xs-injectables-links-module-CardsModule-bcd737d2127d1c2bc79c2957302ada137b6268d9d83c0d98fdfb3961ca240c77aaa3bfc3a9bec75d55fb6a34584e113be8b1a0f5bdac4d594fff3092b78a28d5"' }>
                                        <li class="link">
                                            <a href="injectables/CardsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoriesModule-ffa7d298731d1dea2b690809dc5bbefe387777e0e4421b976dd90d29fcf3bc2d94f5c4b8e88444686619359868bdb680ce76b43521665952d85c0aeb61cdd107"' : 'data-bs-target="#xs-controllers-links-module-CategoriesModule-ffa7d298731d1dea2b690809dc5bbefe387777e0e4421b976dd90d29fcf3bc2d94f5c4b8e88444686619359868bdb680ce76b43521665952d85c0aeb61cdd107"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-ffa7d298731d1dea2b690809dc5bbefe387777e0e4421b976dd90d29fcf3bc2d94f5c4b8e88444686619359868bdb680ce76b43521665952d85c0aeb61cdd107"' :
                                            'id="xs-controllers-links-module-CategoriesModule-ffa7d298731d1dea2b690809dc5bbefe387777e0e4421b976dd90d29fcf3bc2d94f5c4b8e88444686619359868bdb680ce76b43521665952d85c0aeb61cdd107"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoriesModule-ffa7d298731d1dea2b690809dc5bbefe387777e0e4421b976dd90d29fcf3bc2d94f5c4b8e88444686619359868bdb680ce76b43521665952d85c0aeb61cdd107"' : 'data-bs-target="#xs-injectables-links-module-CategoriesModule-ffa7d298731d1dea2b690809dc5bbefe387777e0e4421b976dd90d29fcf3bc2d94f5c4b8e88444686619359868bdb680ce76b43521665952d85c0aeb61cdd107"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-ffa7d298731d1dea2b690809dc5bbefe387777e0e4421b976dd90d29fcf3bc2d94f5c4b8e88444686619359868bdb680ce76b43521665952d85c0aeb61cdd107"' :
                                        'id="xs-injectables-links-module-CategoriesModule-ffa7d298731d1dea2b690809dc5bbefe387777e0e4421b976dd90d29fcf3bc2d94f5c4b8e88444686619359868bdb680ce76b43521665952d85c0aeb61cdd107"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientsModule.html" data-type="entity-link" >ClientsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ClientsModule-46b9012bee0ebb90a8e1ff5794e71db6db303826272bbf4e6ca3343e5c3565888015310d3fc3ab69ddb531c45861189ff0b12b77a928ded81686495dc2bc37d9"' : 'data-bs-target="#xs-controllers-links-module-ClientsModule-46b9012bee0ebb90a8e1ff5794e71db6db303826272bbf4e6ca3343e5c3565888015310d3fc3ab69ddb531c45861189ff0b12b77a928ded81686495dc2bc37d9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClientsModule-46b9012bee0ebb90a8e1ff5794e71db6db303826272bbf4e6ca3343e5c3565888015310d3fc3ab69ddb531c45861189ff0b12b77a928ded81686495dc2bc37d9"' :
                                            'id="xs-controllers-links-module-ClientsModule-46b9012bee0ebb90a8e1ff5794e71db6db303826272bbf4e6ca3343e5c3565888015310d3fc3ab69ddb531c45861189ff0b12b77a928ded81686495dc2bc37d9"' }>
                                            <li class="link">
                                                <a href="controllers/ClientsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClientsModule-46b9012bee0ebb90a8e1ff5794e71db6db303826272bbf4e6ca3343e5c3565888015310d3fc3ab69ddb531c45861189ff0b12b77a928ded81686495dc2bc37d9"' : 'data-bs-target="#xs-injectables-links-module-ClientsModule-46b9012bee0ebb90a8e1ff5794e71db6db303826272bbf4e6ca3343e5c3565888015310d3fc3ab69ddb531c45861189ff0b12b77a928ded81686495dc2bc37d9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClientsModule-46b9012bee0ebb90a8e1ff5794e71db6db303826272bbf4e6ca3343e5c3565888015310d3fc3ab69ddb531c45861189ff0b12b77a928ded81686495dc2bc37d9"' :
                                        'id="xs-injectables-links-module-ClientsModule-46b9012bee0ebb90a8e1ff5794e71db6db303826272bbf4e6ca3343e5c3565888015310d3fc3ab69ddb531c45861189ff0b12b77a928ded81686495dc2bc37d9"' }>
                                        <li class="link">
                                            <a href="injectables/ClientsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DriveTypesModule.html" data-type="entity-link" >DriveTypesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DriveTypesModule-7aa2ce4799ea0622dfbdc9553a2541894e2a8fd2318456015401038e583f497e2413cd5de1d56287b7cf11f33911da6bdbbc8412d064b7969c6dc3f1c1a66565"' : 'data-bs-target="#xs-controllers-links-module-DriveTypesModule-7aa2ce4799ea0622dfbdc9553a2541894e2a8fd2318456015401038e583f497e2413cd5de1d56287b7cf11f33911da6bdbbc8412d064b7969c6dc3f1c1a66565"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DriveTypesModule-7aa2ce4799ea0622dfbdc9553a2541894e2a8fd2318456015401038e583f497e2413cd5de1d56287b7cf11f33911da6bdbbc8412d064b7969c6dc3f1c1a66565"' :
                                            'id="xs-controllers-links-module-DriveTypesModule-7aa2ce4799ea0622dfbdc9553a2541894e2a8fd2318456015401038e583f497e2413cd5de1d56287b7cf11f33911da6bdbbc8412d064b7969c6dc3f1c1a66565"' }>
                                            <li class="link">
                                                <a href="controllers/DriveTypesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DriveTypesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DriveTypesModule-7aa2ce4799ea0622dfbdc9553a2541894e2a8fd2318456015401038e583f497e2413cd5de1d56287b7cf11f33911da6bdbbc8412d064b7969c6dc3f1c1a66565"' : 'data-bs-target="#xs-injectables-links-module-DriveTypesModule-7aa2ce4799ea0622dfbdc9553a2541894e2a8fd2318456015401038e583f497e2413cd5de1d56287b7cf11f33911da6bdbbc8412d064b7969c6dc3f1c1a66565"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DriveTypesModule-7aa2ce4799ea0622dfbdc9553a2541894e2a8fd2318456015401038e583f497e2413cd5de1d56287b7cf11f33911da6bdbbc8412d064b7969c6dc3f1c1a66565"' :
                                        'id="xs-injectables-links-module-DriveTypesModule-7aa2ce4799ea0622dfbdc9553a2541894e2a8fd2318456015401038e583f497e2413cd5de1d56287b7cf11f33911da6bdbbc8412d064b7969c6dc3f1c1a66565"' }>
                                        <li class="link">
                                            <a href="injectables/DrvieTypesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DrvieTypesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ItemsModule.html" data-type="entity-link" >ItemsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ItemsModule-95424e00b28f6503f5ea6eb30d9af8404ad09e4a41bf1225ffae1f8160149abbc58cbbf68bee5d9a34dda0ca579e3ccdf31de3fec9e4ee78d49ef14eb97640a4"' : 'data-bs-target="#xs-controllers-links-module-ItemsModule-95424e00b28f6503f5ea6eb30d9af8404ad09e4a41bf1225ffae1f8160149abbc58cbbf68bee5d9a34dda0ca579e3ccdf31de3fec9e4ee78d49ef14eb97640a4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ItemsModule-95424e00b28f6503f5ea6eb30d9af8404ad09e4a41bf1225ffae1f8160149abbc58cbbf68bee5d9a34dda0ca579e3ccdf31de3fec9e4ee78d49ef14eb97640a4"' :
                                            'id="xs-controllers-links-module-ItemsModule-95424e00b28f6503f5ea6eb30d9af8404ad09e4a41bf1225ffae1f8160149abbc58cbbf68bee5d9a34dda0ca579e3ccdf31de3fec9e4ee78d49ef14eb97640a4"' }>
                                            <li class="link">
                                                <a href="controllers/ItemsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ItemsModule-95424e00b28f6503f5ea6eb30d9af8404ad09e4a41bf1225ffae1f8160149abbc58cbbf68bee5d9a34dda0ca579e3ccdf31de3fec9e4ee78d49ef14eb97640a4"' : 'data-bs-target="#xs-injectables-links-module-ItemsModule-95424e00b28f6503f5ea6eb30d9af8404ad09e4a41bf1225ffae1f8160149abbc58cbbf68bee5d9a34dda0ca579e3ccdf31de3fec9e4ee78d49ef14eb97640a4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ItemsModule-95424e00b28f6503f5ea6eb30d9af8404ad09e4a41bf1225ffae1f8160149abbc58cbbf68bee5d9a34dda0ca579e3ccdf31de3fec9e4ee78d49ef14eb97640a4"' :
                                        'id="xs-injectables-links-module-ItemsModule-95424e00b28f6503f5ea6eb30d9af8404ad09e4a41bf1225ffae1f8160149abbc58cbbf68bee5d9a34dda0ca579e3ccdf31de3fec9e4ee78d49ef14eb97640a4"' }>
                                        <li class="link">
                                            <a href="injectables/ItemsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RentalSalesModule.html" data-type="entity-link" >RentalSalesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RentalSalesModule-c074b418f3e06b7ff914752ff47515b047bfa11fe5e49bf7601cc8ae6849981f4709341651d9ac1704856f6eab71bd3e5a22e56166370a2e207eb5aeca70294b"' : 'data-bs-target="#xs-controllers-links-module-RentalSalesModule-c074b418f3e06b7ff914752ff47515b047bfa11fe5e49bf7601cc8ae6849981f4709341651d9ac1704856f6eab71bd3e5a22e56166370a2e207eb5aeca70294b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RentalSalesModule-c074b418f3e06b7ff914752ff47515b047bfa11fe5e49bf7601cc8ae6849981f4709341651d9ac1704856f6eab71bd3e5a22e56166370a2e207eb5aeca70294b"' :
                                            'id="xs-controllers-links-module-RentalSalesModule-c074b418f3e06b7ff914752ff47515b047bfa11fe5e49bf7601cc8ae6849981f4709341651d9ac1704856f6eab71bd3e5a22e56166370a2e207eb5aeca70294b"' }>
                                            <li class="link">
                                                <a href="controllers/RentalSalesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RentalSalesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RentalSalesModule-c074b418f3e06b7ff914752ff47515b047bfa11fe5e49bf7601cc8ae6849981f4709341651d9ac1704856f6eab71bd3e5a22e56166370a2e207eb5aeca70294b"' : 'data-bs-target="#xs-injectables-links-module-RentalSalesModule-c074b418f3e06b7ff914752ff47515b047bfa11fe5e49bf7601cc8ae6849981f4709341651d9ac1704856f6eab71bd3e5a22e56166370a2e207eb5aeca70294b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RentalSalesModule-c074b418f3e06b7ff914752ff47515b047bfa11fe5e49bf7601cc8ae6849981f4709341651d9ac1704856f6eab71bd3e5a22e56166370a2e207eb5aeca70294b"' :
                                        'id="xs-injectables-links-module-RentalSalesModule-c074b418f3e06b7ff914752ff47515b047bfa11fe5e49bf7601cc8ae6849981f4709341651d9ac1704856f6eab71bd3e5a22e56166370a2e207eb5aeca70294b"' }>
                                        <li class="link">
                                            <a href="injectables/RentalSalesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RentalSalesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubcategoriesModule.html" data-type="entity-link" >SubcategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubcategoriesModule-ed0a065b03de26897b64df7f286e7f1691af6ad68978732d64c67e2bfaa6db160fd8da743ab29cfc6c821312fef83d7f3f9fcb93910d13fe9c2ef48c91453373"' : 'data-bs-target="#xs-controllers-links-module-SubcategoriesModule-ed0a065b03de26897b64df7f286e7f1691af6ad68978732d64c67e2bfaa6db160fd8da743ab29cfc6c821312fef83d7f3f9fcb93910d13fe9c2ef48c91453373"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubcategoriesModule-ed0a065b03de26897b64df7f286e7f1691af6ad68978732d64c67e2bfaa6db160fd8da743ab29cfc6c821312fef83d7f3f9fcb93910d13fe9c2ef48c91453373"' :
                                            'id="xs-controllers-links-module-SubcategoriesModule-ed0a065b03de26897b64df7f286e7f1691af6ad68978732d64c67e2bfaa6db160fd8da743ab29cfc6c821312fef83d7f3f9fcb93910d13fe9c2ef48c91453373"' }>
                                            <li class="link">
                                                <a href="controllers/SubcategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubcategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubcategoriesModule-ed0a065b03de26897b64df7f286e7f1691af6ad68978732d64c67e2bfaa6db160fd8da743ab29cfc6c821312fef83d7f3f9fcb93910d13fe9c2ef48c91453373"' : 'data-bs-target="#xs-injectables-links-module-SubcategoriesModule-ed0a065b03de26897b64df7f286e7f1691af6ad68978732d64c67e2bfaa6db160fd8da743ab29cfc6c821312fef83d7f3f9fcb93910d13fe9c2ef48c91453373"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubcategoriesModule-ed0a065b03de26897b64df7f286e7f1691af6ad68978732d64c67e2bfaa6db160fd8da743ab29cfc6c821312fef83d7f3f9fcb93910d13fe9c2ef48c91453373"' :
                                        'id="xs-injectables-links-module-SubcategoriesModule-ed0a065b03de26897b64df7f286e7f1691af6ad68978732d64c67e2bfaa6db160fd8da743ab29cfc6c821312fef83d7f3f9fcb93910d13fe9c2ef48c91453373"' }>
                                        <li class="link">
                                            <a href="injectables/SubcategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubcategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-81fbd5521223015903fe86c2713978bd3512d60eae0dd3e336645662353a8d7c0431d8f182931ab58acc16977060bde4da7ae7d813d25968c63c610e9d01539b"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-81fbd5521223015903fe86c2713978bd3512d60eae0dd3e336645662353a8d7c0431d8f182931ab58acc16977060bde4da7ae7d813d25968c63c610e9d01539b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-81fbd5521223015903fe86c2713978bd3512d60eae0dd3e336645662353a8d7c0431d8f182931ab58acc16977060bde4da7ae7d813d25968c63c610e9d01539b"' :
                                            'id="xs-controllers-links-module-UsersModule-81fbd5521223015903fe86c2713978bd3512d60eae0dd3e336645662353a8d7c0431d8f182931ab58acc16977060bde4da7ae7d813d25968c63c610e9d01539b"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-81fbd5521223015903fe86c2713978bd3512d60eae0dd3e336645662353a8d7c0431d8f182931ab58acc16977060bde4da7ae7d813d25968c63c610e9d01539b"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-81fbd5521223015903fe86c2713978bd3512d60eae0dd3e336645662353a8d7c0431d8f182931ab58acc16977060bde4da7ae7d813d25968c63c610e9d01539b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-81fbd5521223015903fe86c2713978bd3512d60eae0dd3e336645662353a8d7c0431d8f182931ab58acc16977060bde4da7ae7d813d25968c63c610e9d01539b"' :
                                        'id="xs-injectables-links-module-UsersModule-81fbd5521223015903fe86c2713978bd3512d60eae0dd3e336645662353a8d7c0431d8f182931ab58acc16977060bde4da7ae7d813d25968c63c610e9d01539b"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BranchesController.html" data-type="entity-link" >BranchesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CardsController.html" data-type="entity-link" >CardsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoriesController.html" data-type="entity-link" >CategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ClientsController.html" data-type="entity-link" >ClientsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DriveTypesController.html" data-type="entity-link" >DriveTypesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ItemsController.html" data-type="entity-link" >ItemsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RentalSalesController.html" data-type="entity-link" >RentalSalesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubcategoriesController.html" data-type="entity-link" >SubcategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Branch.html" data-type="entity-link" >Branch</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Card.html" data-type="entity-link" >Card</a>
                                </li>
                                <li class="link">
                                    <a href="entities/CardClient.html" data-type="entity-link" >CardClient</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Client.html" data-type="entity-link" >Client</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DriveType.html" data-type="entity-link" >DriveType</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ElectricVehicle.html" data-type="entity-link" >ElectricVehicle</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Item.html" data-type="entity-link" >Item</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RentalSale.html" data-type="entity-link" >RentalSale</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RentalSalePosition.html" data-type="entity-link" >RentalSalePosition</a>
                                </li>
                                <li class="link">
                                    <a href="entities/RentedItem.html" data-type="entity-link" >RentedItem</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Subcategory.html" data-type="entity-link" >Subcategory</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Vehicle.html" data-type="entity-link" >Vehicle</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddBranchDto.html" data-type="entity-link" >AddBranchDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddCardDto.html" data-type="entity-link" >AddCardDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddCategoryDto.html" data-type="entity-link" >AddCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddClientDto.html" data-type="entity-link" >AddClientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddDriveTypeDto.html" data-type="entity-link" >AddDriveTypeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddItemDto.html" data-type="entity-link" >AddItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddSubcategoryDto.html" data-type="entity-link" >AddSubcategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddUserDto.html" data-type="entity-link" >AddUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryExceptionFilter.html" data-type="entity-link" >QueryExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateClientDto.html" data-type="entity-link" >UpdateClientDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BranchesService.html" data-type="entity-link" >BranchesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CardsService.html" data-type="entity-link" >CardsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientsService.html" data-type="entity-link" >ClientsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DrvieTypesService.html" data-type="entity-link" >DrvieTypesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemsService.html" data-type="entity-link" >ItemsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RentalSalesService.html" data-type="entity-link" >RentalSalesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubcategoriesService.html" data-type="entity-link" >SubcategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BranchIface.html" data-type="entity-link" >BranchIface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CardIface.html" data-type="entity-link" >CardIface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryIface.html" data-type="entity-link" >CategoryIface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClientIface.html" data-type="entity-link" >ClientIface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveTypeIface.html" data-type="entity-link" >DriveTypeIface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemIface.html" data-type="entity-link" >ItemIface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubcategoryIface.html" data-type="entity-link" >SubcategoryIface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateClientIface.html" data-type="entity-link" >UpdateClientIface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserIface.html" data-type="entity-link" >UserIface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});