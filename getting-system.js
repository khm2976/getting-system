export class AppUserAgent {

    userAgent: any;
    userAgentDatas: any;
    os: any;
    osVersion: any;
    deviceModel: any;
    serviceName: any;
    serviceVersion: any;
    serviceVersionCode: any;

    constructor() {
        this.userAgent = navigator.userAgent;
        if(this.isAppUserAgent()) {
            const agent = this.getAppUserAgent().replace('APP29CM(', '').replace(')','');
            const splitString = agent.split(';');
            const splitStringLength = splitString.length;
            for(let i=0; i<splitStringLength; i++) {
                let tmpSplit = splitString[i].split("=");
                if(tmpSplit[0] === 'os') this.os = tmpSplit[1];
                else if(tmpSplit[0] === 'osVersion') this.osVersion = tmpSplit[1];
                else if(tmpSplit[0] === 'deviceModel') this.deviceModel = tmpSplit[1];
                else if(tmpSplit[0] === 'serviceName') this.serviceName = tmpSplit[1];
                else if(tmpSplit[0] === 'serviceVersion') this.serviceVersion = tmpSplit[1];
                else if(tmpSplit[0] === 'serviceVersionCode') this.serviceVersionCode = tmpSplit[1];
            }
        }
    }

    /**
     * 앱 다운로드 스토어 URL
     * @param device {string} ios, android
     * @return {string} 스토어 URL
     */
    storeURL(device?: 'ios' | 'android') {

        const deviceName = device || this.os;
        if (deviceName) {
            return {
                ios: 'https://itunes.apple.com/kr/app/id789634744',
                android: 'https://play.google.com/store/apps/details?id=com.the29cm.app29cm'
            }[deviceName];
        }
        return '';
    }

    //29CM 인앱 확인
    isAppUserAgent() {
        return !(null === this.userAgent.match(/APP29CM([^)]+)\)/g));
    }

    getAppOS() {
        return this.os;
    }

    getAppOSVersion() {
        return this.osVersion;
    }

    getAppDeviceModel() {
        return this.deviceModel;
    }

    getAppServiceName() {
        return this.serviceName;
    }

    getAppServiceVersion() {
        return this.serviceVersion;
    }

    getAppServiceVersionCode() {
        return this.serviceVersionCode;
    }

    isAndroid() {
        return null !== this.getUserAgent().match(/Android/i);
	}

	isIOS() {
		return this.isIPhone() || this.isIpad();
    }

    // WindowPhone agent에서 ios와 android agent를 포함하는 이슈로, 조건에 window.MSStream 추가
    isIPhone() {
		return null !== this.getUserAgent().match(/iPhone|iPod/i) && !window.MSStream;
    }

    /**
     * 1. IPAD OS >= 13 부터 사파리 브라우저로 접근시 데스크탑 모드로 리다이렉션되어 데스크탑 에이전트로 처리(agent에 'ipad'를 포함하지 않는다)
     * 아이패드를 구분하기 위해 플랫폼과 터치 조건을 추가
     * 2. WindowPhone agent에서 ios와 android agent를 포함하는 이슈로, 조건에 window.MSStream 추가
    */
    isIpad() {
        return (null !== this.getUserAgent().match(/ipad/i) && !window.MSStream) || (null !== navigator.platform.match(/MacIntel/i) && navigator.maxTouchPoints > 1);
    }

    isMac() {
        return null !== this.getUserAgent().match(/Mac/i);
    }

    // 아이패드에서 모바일 뷰로 띄우는 경우
    isIpadMobileView() {
        return this.isIpad() && this.isAppUserAgent();
    }

	isBlackBerry() {
		return null !== this.getUserAgent().match(/BlackBerry/i);
	}

	isOpera() {
		return null !== this.getUserAgent().match(/Opera Mini/i);
	}

	isWindows() {
		return null !== this.getUserAgent().match(/IEMobile/i);
    }

    isWindowsPhone() {
		return null !== this.getUserAgent().match(/Windows Phone/i);
    }

    isWins() {
		return null !== this.getUserAgent().match(/Win/i) && null === this.getUserAgent().match(/Windows Phone/i);
    }

    isLinux() {
		return null !== this.getUserAgent().match(/Linux/i) && !this.isAndroid();
    }

    isMobile() {
		return (this.isAndroid() || this.isBlackBerry() || this.isIPhone() || this.isOpera() || this.isWindows()) || this.isIpadMobileView();
	}

    isIE() {
        return this.getUserAgent().indexOf('Trident/') > 0 || this.getUserAgent().indexOf("MSIE ") > 0 || this.getUserAgent().indexOf('Edge/') > 0;
    }

    getUserAgent() {
        return this.userAgent;
    }

    getAppUserAgent() {
        return  this.isAppUserAgent() ? this.userAgent.match(/APP29CM([^)]+)\)/g).toString() : null;
    }

    // os version
    getOS() {
        return this.isAppUserAgent()?
            `${this.getAppOS()} ${this.getAppOSVersion()}`
            : `${this.getWebOS()}`;
    }

    // Detectable operating systems (order is important)
    getWebOS() {
        const ua = this.userAgent;
        if (this.isWindowsPhone()) {
            return `Windows Phone ${this.extractVersion(ua, 'Windows Phone')}`;
        } else if (this.isIOS()) {
            return `ios ${this.extractVersion(ua, 'OS')}`;
        } else if (this.isAndroid()) {
            return `android ${this.extractVersion(ua, 'Android')}`;
        } else if (this.isMac()) {
            return `Mac OS ${this.extractVersion(ua, 'Mac OS X')}`;
        } else if (this.isWins()) {
            const version = this.extractVersion(ua, 'Windows NT');
            let osVersion = '';
            switch (version) {
                case '10.0':
                    osVersion = '10';
                    break;
                case '6.4':
                    osVersion = '10 Technical Preview';
                    break;
                case '6.3':
                    osVersion = '8.1';
                    break;
                case '6.2':
                    osVersion = '8';
                    break;
                case '6.1':
                    osVersion = 'Server 2008 R2 / 7';
                    break;
                case '6.0':
                    osVersion = 'Server 2008 / Vista';
                    break;
                case '5.2':
                    osVersion = 'Server 2003 / XP 64-bit';
                    break;
                case '5.1':
                    osVersion = 'XP';
                    break;
                case '5.01':
                    osVersion = '2000 SP1';
                    break;
                case '5.0':
                    osVersion = '2000';
                    break;
                case '4.0':
                    osVersion = 'NT';
                    break;
                case '4.90':
                    osVersion = 'ME';
                    break;
                default:
                    break;
            }
            return `Windows ${osVersion}`;
        } else {
            return 'undefined';
        }
    }

    // 0.0.0, 0.0, 0_0_0, 0_0 버전 추출
    extractVersion(ua: string, pattern: string) {
        const platform = RegExp('\\b' + `${pattern}` + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua);
        let version: any = '';
        if (platform) {
            version = RegExp('[\\d(.|_)]{1,}').exec(platform[0]);
        }
        if (version) {
            version = version[0].replace(/_/g, '.')
        } else {
            version = '';
        }

        return version;
    }

    getBrowser() {
        const ua = this.userAgent;
        const browser = this.extractBrowser(ua);
        return browser? `${browser.name} ${browser.version}` : 'undefined';
    }

    extractBrowser(ua: string) {
        const browsers = [
            ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
            ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
            ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
            ['edge', /Edge\/([0-9\._]+)/],
            ['ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],
            ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
            ['ie', /MSIE\s(7\.0)/],
            ['safari', /Version\/([0-9\._]+).*Safari/],
            ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
            ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
            ['android', /Android\s([0-9\.]+)/],
            ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
            ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
            ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/]
        ];

        return browsers
            .filter(definition => (<RegExp>definition[1]).test(ua))
            .map(definition => {
                const match = (<RegExp>definition[1]).exec(ua);

                const extractedVersion = match && match[1].split(/[._]/);
                const version = extractedVersion.slice(0, extractedVersion.length);
                if (version && version.length < 3) {
                    Array.prototype.push.apply(version, version.length === 1 ? [0, 0] : [0]);  // major, minor, patch 형태
                }

                return {
                    name: String(definition[0]),
                    version: version.join('.'),
                };
            })
            .shift();
    }

    getMobileDevice() {
        return this.isAppUserAgent()? `${this.getAppDeviceModel()}` : `${this.getDevice()}`;
    }

    getDevice() {
        if (this.isIpad()) { return 'iPad'; } // desktop agent로 변경되는 예외 처리
        if (!this.isMobile()) { return null; }

        const ua = this.userAgent;
        const devices = [
            ['iPod', /ipod/i],
            ['iPad', /ipad/i],
            ['iPhone', /iphone/i],
            ['android', /android/i],
            ['ieMobile', /iemobile/i],
            ['bada', /bada/i],
            ['blackberry', /blackberry/i],
        ];

        return devices
            .filter(definition => (<RegExp>definition[1]).test(ua))
            .map(definition => definition[0])
            .shift() || 'undefined';
    }
}
