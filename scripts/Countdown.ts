/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/SourceServer.ts" />
/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />

/// <reference path="./CountdownNamespaceManager.ts" />
/// <reference path="./CountdownClientNamespaceManager.ts" />

var request : any = require('request');
var fs : any = require('fs');

/**
 * Represents the PulseTotem Countdown' Service.
 *
 * @class Countdown
 * @extends SourceServer
 */
class Countdown extends SourceServer {

	static host : string;
	static upload_directory : string;

    /**
     * Constructor.
     *
     * @param {number} listeningPort - Server's listening port..
     * @param {Array<string>} arguments - Server's command line arguments.
     */
    constructor(listeningPort : number, arguments : Array<string>) {
        super(listeningPort, arguments);

        this.init();
    }

    /**
     * Method to init the Countdown server.
     *
     * @method init
     */
    init() {
        var self = this;

		if (process.env.Countdown_HOST == undefined) {
			Countdown.host = "http://localhost:6023";
		} else {
			Countdown.host = process.env.Countdown_HOST;
		}

		if (process.env.Countdown_UPLOAD_DIR == undefined) {
			Countdown.upload_directory = "/tmp/uploads";
		} else {
			Countdown.upload_directory = process.env.Countdown_UPLOAD_DIR;
		}

        this.addNamespace("Countdown", CountdownNamespaceManager);

		this.addNamespace("CountdownClient", CountdownClientNamespaceManager);
    }
}

/**
 * Server's Countdown listening port.
 *
 * @property _CountdownListeningPort
 * @type number
 * @private
 */
var _CountdownListeningPort : number = process.env.PORT || 6023;

/**
 * Server's Countdown command line arguments.
 *
 * @property _CountdownArguments
 * @type Array<string>
 * @private
 */
var _CountdownArguments : Array<string> = process.argv;

var serverInstance = new Countdown(_CountdownListeningPort, _CountdownArguments);
serverInstance.run();