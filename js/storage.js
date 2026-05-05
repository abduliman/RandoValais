// RandoValais — LocalStorage Manager with Auth & Moderation
const Storage = {
  _get(key) { try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; } },
  _set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },

  // ===== USERS & AUTH =====
  getUsers() { return this._get('rv_users') || []; },
  _saveUsers(users) { this._set('rv_users', users); },

  // Simple hash (not crypto-safe, but good for demo)
  _hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h |= 0;
    }
    return 'h_' + Math.abs(h).toString(36);
  },

  register(name, email, password) {
    const users = this.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'Email déjà utilisé' };
    }
    if (name.length < 2) return { ok: false, error: 'Nom trop court (min. 2 caractères)' };
    if (password.length < 4) return { ok: false, error: 'Mot de passe trop court (min. 4 caractères)' };

    const user = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: this._hash(password),
      role: 'member', // 'member' or 'admin'
      avatar: name.trim().charAt(0).toUpperCase(),
      joined: new Date().toISOString(),
      active: true
    };
    users.push(user);
    this._saveUsers(users);
    const session = { ...user };
    delete session.password;
    this.setUser(session);
    return { ok: true, user: session };
  },

  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return { ok: false, error: 'Aucun compte avec cet email' };
    if (user.password !== this._hash(password)) return { ok: false, error: 'Mot de passe incorrect' };
    if (!user.active) return { ok: false, error: 'Compte désactivé' };
    const session = { ...user };
    delete session.password;
    this.setUser(session);
    return { ok: true, user: session };
  },

  // Current session
  getUser() { return this._get('rv_user'); },
  setUser(u) { this._set('rv_user', u); },
  logout() { localStorage.removeItem('rv_user'); },
  isAdmin() { const u = this.getUser(); return u && u.role === 'admin'; },
  isLoggedIn() { return !!this.getUser(); },

  updateUser(updates) {
    const user = this.getUser();
    if (!user) return;
    Object.assign(user, updates);
    this.setUser(user);
    // Also update in users list
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx > -1) { Object.assign(users[idx], updates); this._saveUsers(users); }
  },

  // Admin: get all users
  getAllUsers() { return this.getUsers().map(u => { const c = {...u}; delete c.password; return c; }); },
  toggleUserActive(userId) {
    const users = this.getUsers();
    const u = users.find(x => x.id === userId);
    if (u) { u.active = !u.active; this._saveUsers(users); }
  },
  setUserRole(userId, role) {
    const users = this.getUsers();
    const u = users.find(x => x.id === userId);
    if (u) { u.role = role; this._saveUsers(users); }
  },

  // ===== LIKES =====
  getLikes() { return this._get('rv_likes') || {}; },
  toggleLike(id) {
    const likes = this.getLikes();
    likes[id] = !likes[id];
    if (!likes[id]) delete likes[id];
    this._set('rv_likes', likes);
    const counts = this.getLikeCounts();
    counts[id] = (counts[id] || 0) + (likes[id] ? 1 : -1);
    if (counts[id] < 0) counts[id] = 0;
    this._set('rv_likeCounts', counts);
    return !!likes[id];
  },
  isLiked(id) { return !!this.getLikes()[id]; },
  getLikeCounts() { return this._get('rv_likeCounts') || {}; },
  getLikeCount(id) { return this.getLikeCounts()[id] || 0; },

  // ===== FAVORITES =====
  getFavorites() { return this._get('rv_favs') || []; },
  toggleFavorite(id) {
    let favs = this.getFavorites();
    const idx = favs.indexOf(id);
    if (idx > -1) { favs.splice(idx, 1); } else { favs.push(id); }
    this._set('rv_favs', favs);
    return favs.includes(id);
  },
  isFavorite(id) { return this.getFavorites().includes(id); },

  // ===== COMMENTS (with moderation) =====
  _getAllComments() { return this._get('rv_comments') || {}; },
  getComments(hikeId) {
    const all = this._getAllComments()[hikeId] || [];
    // Members see only approved, admin sees all
    if (this.isAdmin()) return all;
    return all.filter(c => c.status === 'approved');
  },
  getPendingComments() {
    const all = this._getAllComments();
    const pending = [];
    Object.entries(all).forEach(([hikeId, comments]) => {
      comments.forEach(c => {
        if (c.status === 'pending') pending.push({ ...c, hikeId: parseInt(hikeId) });
      });
    });
    return pending;
  },
  addComment(hikeId, comment) {
    const all = this._getAllComments();
    if (!all[hikeId]) all[hikeId] = [];
    comment.id = Date.now();
    comment.date = new Date().toISOString();
    comment.authorId = this.getUser()?.id || 0;
    // Admin comments auto-approved, member comments pending
    comment.status = this.isAdmin() ? 'approved' : 'pending';
    all[hikeId].unshift(comment);
    this._set('rv_comments', all);
    return comment;
  },
  moderateComment(hikeId, commentId, status) {
    const all = this._getAllComments();
    const comments = all[hikeId] || [];
    const c = comments.find(x => x.id === commentId);
    if (c) { c.status = status; this._set('rv_comments', all); }
  },
  deleteComment(hikeId, commentId) {
    const all = this._getAllComments();
    if (all[hikeId]) {
      all[hikeId] = all[hikeId].filter(c => c.id !== commentId);
      this._set('rv_comments', all);
    }
  },
  getAllCommentsCount() {
    const all = this._getAllComments();
    return Object.values(all).reduce((s, c) => s + c.filter(x => x.status === 'approved').length, 0);
  },

  // ===== PHOTOS =====
  getPhotos(hikeId) { return (this._get('rv_photos') || {})[hikeId] || []; },
  addPhoto(hikeId, photo) {
    const all = this._get('rv_photos') || {};
    if (!all[hikeId]) all[hikeId] = [];
    photo.id = Date.now();
    photo.date = new Date().toISOString();
    all[hikeId].unshift(photo);
    this._set('rv_photos', all);
    return photo;
  },
  getAllPhotosCount() {
    const all = this._get('rv_photos') || {};
    return Object.values(all).reduce((s, p) => s + p.length, 0);
  },

  // ===== INIT =====
  initDemo() {
    // Seed admin account (always ensure it exists)
    const users = this.getUsers();
    if (!users.find(u => u.role === 'admin')) {
      users.push({
        id: 1,
        name: 'Admin RandoValais',
        email: 'admin@randovalais.ch',
        password: this._hash('admin2026'),
        role: 'admin',
        avatar: 'A',
        joined: new Date().toISOString(),
        active: true
      });
      this._saveUsers(users);
    }

    if (this._get('rv_initialized')) return;
    // Demo like counts
    const counts = {};
    HIKES.forEach(h => { counts[h.id] = Math.floor(Math.random() * 50) + 5; });
    this._set('rv_likeCounts', counts);
    // Demo comments (all approved)
    const demoComments = {};
    const names = ['Marie', 'Jean-Pierre', 'Anna', 'Stefan', 'Sophie', 'Marco'];
    const texts = [
      "Magnifique randonnée, vue incroyable !",
      "Super parcours, on y retourne chaque été.",
      "Attention au vertige sur certains passages !",
      "Un must-do en Valais !",
      "Paysages à couper le souffle."
    ];
    HIKES.forEach(h => {
      const n = Math.floor(Math.random() * 3) + 1;
      demoComments[h.id] = [];
      for (let i = 0; i < n; i++) {
        demoComments[h.id].push({
          id: Date.now() + i + h.id * 1000,
          name: names[Math.floor(Math.random() * names.length)],
          text: texts[Math.floor(Math.random() * texts.length)],
          rating: Math.floor(Math.random() * 2) + 4,
          date: new Date(Date.now() - Math.random() * 90 * 86400000).toISOString(),
          status: 'approved',
          authorId: 0
        });
      }
    });
    this._set('rv_comments', demoComments);
    this._set('rv_initialized', true);
  }
};
