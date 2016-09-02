/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/NamespaceManager.ts" />
/// <reference path="../t6s-core/core-backend/scripts/session/SessionNamespaceManagerItf.ts" />
/// <reference path="../t6s-core/core-backend/scripts/session/Session.ts" />
/// <reference path="../t6s-core/core-backend/scripts/session/SessionStatus.ts" />

/// <reference path="./sources/Manager.ts" />
/// <reference path="./CountdownNamespaceManager.ts" />

/**
 * Represents the PulseTotem Countdown's NamespaceManager to manage connections from mobile clients.
 *
 * @class CountdownClientNamespaceManager
 * @extends NamespaceManager
 * @implements SessionNamespaceManagerItf
 */
class CountdownClientNamespaceManager extends NamespaceManager implements SessionNamespaceManagerItf {

	/**
	 * Call NamespaceManager.
	 *
	 * @property _callNamespaceManager
	 * @type CountdownNamespaceManager
	 */
	private _callNamespaceManager : CountdownNamespaceManager;

	/**
	 * Constructor.
	 *
	 * @constructor
	 * @param {any} socket - The socket.
	 */
	constructor(socket : any) {
		super(socket);

		this._callNamespaceManager = null;

		this.addListenerToSocket('TakeControl', function(callSocketId : any, self : CountdownClientNamespaceManager) { self.takeControl(callSocketId); });
	}

	/**
	 * Search for callSocket and init a Session to take control on screen.
	 *
	 * @method takeControl
	 * @param {Object} callSocketId - A JSON object with callSocket's Id.
	 */
	takeControl(callSocketId : any) {
		var self = this;

		for(var iNM in self.server().namespaceManagers) {
			var namespaceManager : any = self.server().namespaceManagers[iNM];
			if(typeof(namespaceManager["getParams"] != "undefined")) {
				var params : any = namespaceManager.getParams();

				Logger.debug("CountdownClientNamespaceManager - takeControl : params", params);
			}
		}

		/*var callNamespaceManager = self.server().retrieveNamespaceManagerFromSocketId(callSocketId.callSocketId);

		if(callNamespaceManager == null) {
			self.socket.emit("ControlSession", self.formatResponse(false, "NamespaceManager corresponding to callSocketid '" + callSocketId.callSocketId + "' doesn't exist."));
		} else {
			self._callNamespaceManager = callNamespaceManager;

			var newSession : Session = callNamespaceManager.newSession(self);

			self.socket.emit("ControlSession", self.formatResponse(true, newSession));

			var backgroundInfo = { "backgroundURL": this._callNamespaceManager.getParams().BackgroundURL };
			self.socket.emit("SetBackground", self.formatResponse(true, backgroundInfo));
		}*/
	}

	/**
	 * Lock the control of the Screen for the Session in param.
	 *
	 * @method lockControl
	 * @param {Session} session - Session which takes the control of the Screen.
	 */
	lockControl(session : Session) {
		var self = this;

		//self.socket.emit("LockedControl", self.formatResponse(true, session));

		Logger.debug("CountdownClientNamespaceManager : lockControl");
	}

	/**
	 * Unlock the control of the Screen for the Session in param.
	 *
	 * @method unlockControl
	 * @param {Session} session - Session which takes the control of the Screen.
	 */
	unlockControl(session : Session) {
		var self = this;

		//self.socket.emit("UnlockedControl", self.formatResponse(true, session));

		Logger.debug("CountdownClientNamespaceManager : unlockControl");
	}

	/**
	 * Method called when socket is disconnected.
	 *
	 * @method onClientDisconnection
	 */
	onClientDisconnection() {
		var self = this;

		this.onDisconnection();

		/*if(self._callNamespaceManager != null) {
			self._callNamespaceManager.getSessionManager().finishActiveSession();
		}*/

		Logger.debug("CountdownClientNamespaceManager : onClientDisconnection");
	}
}