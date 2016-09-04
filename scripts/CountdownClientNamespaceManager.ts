/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/NamespaceManager.ts" />

/// <reference path="./sources/Manager.ts" />
/// <reference path="./CountdownNamespaceManager.ts" />

/**
 * Represents the PulseTotem Countdown's NamespaceManager to manage connections from mobile clients.
 *
 * @class CountdownClientNamespaceManager
 * @extends NamespaceManager
 */
class CountdownClientNamespaceManager extends NamespaceManager {

	/**
	 * Countdown Client 's ProfilId
	 *
	 * @property _profilId
	 * @type string
	 */
	private _profilId : string;

	/**
	 * Constructor.
	 *
	 * @constructor
	 * @param {any} socket - The socket.
	 */
	constructor(socket : any) {
		super(socket);

		this.addListenerToSocket('SetProfilId', function(profilId : any, self : CountdownClientNamespaceManager) { self.setProfilId(profilId); });
		this.addListenerToSocket('Wait', function(countdown : any, self : CountdownClientNamespaceManager) { self.wait(countdown); });
		this.addListenerToSocket('Ready', function(countdown : any, self : CountdownClientNamespaceManager) { self.ready(countdown); });
		this.addListenerToSocket('Run', function(countdown : any, self : CountdownClientNamespaceManager) { self.run(countdown); });
		this.addListenerToSocket('Pause', function(countdown : any, self : CountdownClientNamespaceManager) { self.pause(countdown); });
	}

	/**
	 * Method called to broadcast message to screen with specified profilId.
	 *
	 * @method broadcastToAllScreens
	 * @param {string} cmd - cmd description
	 * @param {any} content - cmd argument
	 */
	broadcastToAllScreens(cmd : string, content : any) {
		var self = this;

		for(var iNM in self.server().namespaceManagers) {
			var namespaceManager : any = self.server().namespaceManagers[iNM];
			if(typeof(namespaceManager["getParams"]) != "undefined") {
				var params : any = namespaceManager.getParams();

				if(params.SDI.profilId == parseInt(self._profilId)) {
					namespaceManager.onExternalMessage(cmd, content);
				}
			}
		}
	}

	/**
	 * Set the client profilId..
	 *
	 * @method setProfilId
	 * @param {Object} profilId - A JSON object with profil's Id.
	 */
	setProfilId(profilIdObj : any) {
		this._profilId = profilIdObj.profilId;
	}

	/**
	 * Manage 'Wait' message.
	 *
	 * @method wait
	 * @param {Object} countdown - A JSON object representing countdown.
	 */
	wait(countdown : any) {
		this.broadcastToAllScreens("wait", countdown);
	}

	/**
	 * Manage 'Ready' message.
	 *
	 * @method ready
	 * @param {Object} countdown - A JSON object representing countdown.
	 */
	ready(countdown : any) {
		this.broadcastToAllScreens("ready", countdown);
	}

	/**
	 * Manage 'Run' message.
	 *
	 * @method run
	 * @param {Object} countdown - A JSON object representing countdown.
	 */
	run(countdown : any) {
		this.broadcastToAllScreens("run", countdown);
	}

	/**
	 * Manage 'Pause' message.
	 *
	 * @method pause
	 * @param {Object} countdown - A JSON object representing countdown.
	 */
	pause(countdown : any) {
		this.broadcastToAllScreens("pause", countdown);
	}
}