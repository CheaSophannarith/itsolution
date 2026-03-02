<template>
	<header :class="['sticky top-0 z-50 transition-transform duration-300', { '-translate-y-full': hideHeader }]">
		<!-- Top Section - White Background -->
		<div class="bg-white border-b border-gray-200 mx-auto max-w-full">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
				<div class="flex items-center justify-between gap-2 sm:gap-4">
					<!-- Mobile Menu Button -->
					<button @click="toggleMobileMenu" class="lg:hidden p-2 text-brand hover:bg-gray-100 rounded-md">
						<Menu class="w-6 h-6" />
					</button>

					<!-- Logo -->
					<NuxtLink to="/" class="shrink-0">
						<img src="/logo.jpg" alt="TanXLM" class="h-8 sm:h-12" />
					</NuxtLink>

					<!-- Search Bar - Hidden on mobile, shown on md+ -->
					<div class="hidden md:flex flex-1 max-w-md mx-4 lg:mx-12">
						<div class="relative w-full" ref="searchRef">
							<Input v-model="searchQuery" type="text" placeholder="Search products..."
								@focus="showSearchDropdown = true"
								class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
							<button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
								<Search class="w-5 h-5" />
							</button>

							<!-- Search Dropdown -->
							<Transition enter-active-class="transition ease-out duration-200"
								enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
								leave-active-class="transition ease-in duration-150"
								leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
								<div v-if="showSearchDropdown && searchQuery.length > 0"
									class="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[500px] overflow-y-auto">
									<!-- Loading State -->
									<div v-if="searchStatus === 'pending'" class="p-4 text-center text-gray-500">
										<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto">
										</div>
										<p class="mt-2 text-sm">Searching...</p>
									</div>

									<!-- Results -->
									<div v-else-if="searchResults.length > 0">
										<div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
											<p class="text-sm font-semibold text-gray-700">
												Products for "{{ searchQuery }}"
											</p>
										</div>
										<div class="p-2 space-y-2">
											<NuxtLink v-for="product in searchResults" :key="product.uuid"
												:to="`/products/${product.slug}`" @click="closeSearch"
												class="flex items-center gap-3 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-brand hover:bg-gray-50 transition-all cursor-pointer">
												<div
													class="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
													<img v-if="product.image" :src="product.image" :alt="product.name"
														class="w-full h-full object-cover" />
													<div v-else class="w-full h-full flex items-center justify-center">
														<Search class="w-6 h-6 text-gray-400" />
													</div>
												</div>
												<div class="flex-1 min-w-0">
													<h4 class="text-sm font-semibold text-gray-900 truncate">{{
														product.name }}</h4>
													<p class="text-xs text-gray-600 line-clamp-1 mt-0.5">{{
														product.short_description }}</p>
													<p class="text-sm font-bold text-brand mt-1">${{ product.price }}
													</p>
												</div>
											</NuxtLink>
										</div>
									</div>

									<!-- No Results -->
									<div v-else class="p-8 text-center">
										<Search class="w-12 h-12 text-gray-300 mx-auto mb-3" />
										<p class="text-gray-600 font-medium">No items found with your keyword</p>
										<p class="text-sm text-gray-500 mt-1">Try searching with different terms</p>
									</div>
								</div>
							</Transition>
						</div>
					</div>

					<!-- Right Section -->
					<div class="flex items-center gap-2 sm:gap-4 text-sm">
						<!-- Mobile Search Button -->
						<button @click="toggleMobileSearch"
							class="md:hidden p-2 text-brand hover:bg-gray-100 rounded-md">
							<Search class="w-5 h-5" />
						</button>

						<!-- Wishlist Icon - Desktop -->
						<NuxtLink to="/wishlist"
							class="hidden sm:block p-2 text-brand hover:bg-gray-100 rounded-md transition-colors relative">
							<Heart class="w-5 h-5" />
							<span v-if="wishlistStore.totalItems > 0"
								class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
								{{ wishlistStore.totalItems > 99 ? '99+' : wishlistStore.totalItems }}
							</span>
						</NuxtLink>

						<!-- Cart Drawer -->
						<CartDrawer>
							<template #trigger>
								<button
									class="relative p-2 text-brand hover:text-white hover:bg-brand rounded-md transition-all">
									<ShoppingCart class="w-5 h-5" />
									<span v-if="cartTotalItems > 0"
										class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{{
											cartTotalItems }}</span>
								</button>
							</template>
						</CartDrawer>

						<!-- Contact Us - Hidden on mobile -->
						<span class="hidden sm:block text-gray-300">|</span>
						<NuxtLink to="/contact"
							class="hidden sm:block text-brand hover:text-white hover:bg-brand hover:px-2 hover:py-2 rounded-md transition-all font-bold">
							Contact Us
						</NuxtLink>

						<!-- User Menu or Sign In - Hidden on mobile -->
						<span class="hidden sm:block text-gray-300">|</span>
						<div v-if="authStore.isAuthenticated" class="hidden sm:block relative" ref="userMenuRef"
							@mouseenter="openUserMenu" @mouseleave="closeUserMenuDelayed">
							<button @click="toggleUserMenu"
								class="flex items-center gap-2 p-2 text-brand hover:bg-gray-100 rounded-full transition-all">
								<!-- Profile Image or Initials -->
								<div v-if="authStore.user?.avatar"
									class="w-9 h-9 border border-brand rounded-full overflow-hidden flex-shrink-0 ring-2 ring-transparent hover:ring-brand transition-all">
									<img :src="authStore.user.avatar" :alt="authStore.user.name"
										class="w-full h-full object-cover" />
								</div>
								<div v-else
									class="w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ring-2 ring-transparent hover:ring-brand/50 transition-all">
									{{ userInitials }}
								</div>
							</button>
							<Transition enter-active-class="transition ease-out duration-100"
								enter-from-class="transform opacity-0 scale-95"
								enter-to-class="transform opacity-100 scale-100"
								leave-active-class="transition ease-in duration-75"
								leave-from-class="transform opacity-100 scale-100"
								leave-to-class="transform opacity-0 scale-95">
								<div v-if="userMenuOpen" @mouseenter="keepUserMenuOpen"
									@mouseleave="closeUserMenuDelayed"
									class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
									<!-- User Info Header -->
									<div class="px-4 py-3 border-b border-gray-200">
										<div class="flex items-center gap-3">
											<!-- Profile Image or Initials -->
											<div v-if="authStore.user?.avatar"
												class="w-12 h-12 border border-brand rounded-full overflow-hidden flex-shrink-0">
												<img :src="authStore.user.avatar" :alt="authStore.user.name"
													class="w-full h-full object-cover" />
											</div>
											<div v-else
												class="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center text-base font-bold flex-shrink-0">
												{{ userInitials }}
											</div>
											<div class="flex-1 min-w-0">
												<p class="text-sm font-semibold text-gray-900 truncate">{{
													authStore.user?.name }}</p>
												<p class="text-xs text-gray-600 truncate">{{ authStore.user?.email }}
												</p>
											</div>
										</div>
									</div>

									<!-- Menu Items -->
									<div class="py-1">
										<NuxtLink to="/profile" @click="closeUserMenu"
											class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
											<CircleUser class="w-5 h-5 text-gray-500" />
											<span>My Profile</span>
										</NuxtLink>
										<NuxtLink to="/orders" @click="closeUserMenu"
											class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
											<ShoppingCart class="w-5 h-5 text-gray-500" />
											<span>My Orders</span>
										</NuxtLink>
									</div>

									<!-- Logout -->
									<div class="border-t border-gray-200 py-1">
										<button @click="handleLogout"
											class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
											<LogOut class="w-5 h-5" />
											<span>Logout</span>
										</button>
									</div>
								</div>
							</Transition>
						</div>
						<NuxtLink v-else to="/signin"
							class="hidden sm:flex items-center gap-2 text-brand hover:text-white hover:bg-brand hover:px-2 hover:py-2 rounded-md transition-all font-bold">
							<CircleUser class="w-5 h-5" />
							<span class="hidden lg:inline">Sign In</span>
						</NuxtLink>

						<!-- Mobile Wishlist Icon -->
						<NuxtLink to="/wishlist"
							class="sm:hidden p-2 text-brand hover:bg-gray-100 rounded-md transition-colors relative">
							<Heart class="w-5 h-5" />
							<span v-if="wishlistStore.totalItems > 0"
								class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
								{{ wishlistStore.totalItems > 99 ? '99+' : wishlistStore.totalItems }}
							</span>
						</NuxtLink>

						<!-- Mobile Profile Icon - Always visible -->
						<div v-if="authStore.isAuthenticated" class="sm:hidden relative" ref="mobileProfileMenuRef">
							<button @click="toggleProfileMenu" class="p-2 hover:bg-gray-100 rounded-md relative">
								<!-- Profile Image or Initials -->
								<div v-if="authStore.user?.avatar"
									class="w-8 h-8 border border-brand  rounded-full overflow-hidden">
									<img :src="authStore.user.avatar" :alt="authStore.user.name"
										class="w-full h-full object-cover" />
								</div>
								<div v-else
									class="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-xs font-semibold">
									{{ userInitials }}
								</div>
								<!-- Green dot indicator for logged in -->
								<span
									class="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
							</button>

							<!-- Profile Dropdown Menu -->
							<Transition enter-active-class="transition ease-out duration-100"
								enter-from-class="transform opacity-0 scale-95"
								enter-to-class="transform opacity-100 scale-100"
								leave-active-class="transition ease-in duration-75"
								leave-from-class="transform opacity-100 scale-100"
								leave-to-class="transform opacity-0 scale-95">
								<div v-if="profileMenuOpen"
									class="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
									<!-- User Info Header -->
									<div class="p-4 bg-white border-b border-brand relative">
										<button @click="closeProfileMenu"
											class="absolute top-2 right-2 p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-md transition-colors">
											<X class="w-4 h-4" />
										</button>
										<div class="flex items-center gap-3 pr-8">
											<!-- Profile Image or Initials -->
											<div v-if="authStore.user?.avatar"
												class="w-12 h-12 border border-brand  rounded-full overflow-hidden flex-shrink-0">
												<img :src="authStore.user.avatar" :alt="authStore.user.name"
													class="w-full h-full object-cover" />
											</div>
											<div v-else
												class="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-xs font-semibold">
												{{ userInitials }}
											</div>
											<div class="flex-1 min-w-0">
												<p class="text-sm font-semibold text-black truncate">{{
													authStore.user?.name }}</p>
												<p class="text-xs text-black/80 truncate">{{ authStore.user?.email }}
												</p>
											</div>
										</div>
									</div>

									<!-- Menu Items -->
									<div class="py-2">
										<NuxtLink to="/profile" @click="closeProfileMenu"
											class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
											<CircleUser class="w-5 h-5 text-brand" />
											<div>
												<p class="text-sm font-medium">My Profile</p>
											</div>
										</NuxtLink>

										<NuxtLink to="/orders" @click="closeProfileMenu"
											class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
											<ShoppingCart class="w-5 h-5 text-brand" />
											<div>
												<p class="text-sm font-medium">My Orders</p>
											</div>
										</NuxtLink>

										<hr class="my-2 border-gray-200">

										<button @click="handleLogout"
											class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors">
											<LogOut class="w-5 h-5" />
											<span class="text-sm font-medium">Logout</span>
										</button>
									</div>
								</div>
							</Transition>
						</div>
						<NuxtLink v-else to="/signin" class="sm:hidden p-2 text-brand hover:bg-gray-100 rounded-md">
							<CircleUser class="w-5 h-5" />
						</NuxtLink>
					</div>
				</div>

				<!-- Mobile Search Bar -->
				<Transition enter-active-class="transition ease-out duration-200"
					enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
					leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0"
					leave-to-class="opacity-0 -translate-y-2">
					<div v-if="mobileSearchOpen" class="md:hidden mt-3">
						<div class="relative w-full" ref="mobileSearchRef">
							<Input v-model="mobileSearchQuery" type="text" placeholder="Search products..." autofocus
								@focus="showMobileSearchDropdown = true"
								class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
							<button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
								<Search class="w-5 h-5" />
							</button>

							<!-- Mobile Search Dropdown -->
							<Transition enter-active-class="transition ease-out duration-200"
								enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
								leave-active-class="transition ease-in duration-150"
								leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
								<div v-if="showMobileSearchDropdown && mobileSearchQuery.length > 0"
									class="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[400px] overflow-y-auto">
									<!-- Loading State -->
									<div v-if="mobileSearchStatus === 'pending'" class="p-4 text-center text-gray-500">
										<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto">
										</div>
										<p class="mt-2 text-sm">Searching...</p>
									</div>

									<!-- Results -->
									<div v-else-if="mobileSearchResults.length > 0">
										<div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
											<p class="text-sm font-semibold text-gray-700">
												Products for "{{ mobileSearchQuery }}"
											</p>
										</div>
										<div class="p-2 space-y-2">
											<NuxtLink v-for="product in mobileSearchResults" :key="product.uuid"
												:to="`/products/${product.slug}`" @click="closeMobileSearch"
												class="flex items-center gap-3 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-brand hover:bg-gray-50 transition-all">
												<div
													class="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
													<img v-if="product.image" :src="product.image" :alt="product.name"
														class="w-full h-full object-cover" />
													<div v-else class="w-full h-full flex items-center justify-center">
														<Search class="w-6 h-6 text-gray-400" />
													</div>
												</div>
												<div class="flex-1 min-w-0">
													<h4 class="text-sm font-semibold text-gray-900 truncate">{{
														product.name }}</h4>
													<p class="text-xs text-gray-600 line-clamp-1 mt-0.5">{{
														product.short_description }}
													</p>
													<p class="text-sm font-bold text-brand mt-1">${{ product.price }}
													</p>
												</div>
											</NuxtLink>
										</div>
									</div>

									<!-- No Results -->
									<div v-else class="p-8 text-center">
										<Search class="w-12 h-12 text-gray-300 mx-auto mb-3" />
										<p class="text-gray-600 font-medium">No items found with your keyword</p>
										<p class="text-sm text-gray-500 mt-1">Try searching with different terms</p>
									</div>
								</div>
							</Transition>
						</div>
					</div>
				</Transition>
			</div>
		</div>

		<!-- Bottom Section - Brand Background (Desktop Navigation) -->
		<div class="hidden lg:block bg-brand">
			<div class="w-full px-6 mx-auto max-w-7xl">
				<div class="flex items-center justify-between">
					<!-- Navigation Links -->
					<nav class="flex items-center">
						<div v-for="item in navItems" :key="item.name" class="relative"
							@mouseenter="openDropdown(item.name)" @mouseleave="closeDropdown">
							<NuxtLink v-if="!item.children" :to="item.href" :class="[
								'px-4 xl:px-6 py-3 text-brand-foreground font-medium transition-colors flex items-center gap-1 cursor-pointer text-sm xl:text-base',
								activeDropdown === item.name ? 'bg-white/20' : 'hover:bg-white/10'
							]">
								{{ item.name }}
							</NuxtLink>
							<button v-else type="button" :class="[
								'px-4 xl:px-6 py-3 text-brand-foreground font-medium transition-colors flex items-center gap-1 cursor-pointer text-sm xl:text-base',
								activeDropdown === item.name ? 'bg-white/20' : 'hover:bg-white/10'
							]">
								{{ item.name }}
								<ChevronDown class="w-4 h-4" />
							</button>
						</div>
					</nav>

					<!-- Phone Number & Social Icons -->
					<div class="flex items-center gap-4">
						<a href="#" class="text-brand-foreground font-semibold py-3 text-sm xl:text-base">
							+855 17 86 88 83
						</a>
						<a href="https://www.facebook.com/ITSolutionCam/" target="_blank" rel="noopener noreferrer" class="text-brand-foreground/80 hover:text-brand-foreground">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
							</svg>
						</a>
						<a href="https://t.me/hengitsolution" target="_blank" rel="noopener noreferrer" class="text-brand-foreground/80 hover:text-brand-foreground">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
								<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile Menu Overlay -->
		<Transition enter-active-class="transition-opacity ease-linear duration-300" enter-from-class="opacity-0"
			enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-300"
			leave-from-class="opacity-100" leave-to-class="opacity-0">
			<div v-if="mobileMenuOpen" class="fixed inset-0 bg-black/50 z-40 lg:hidden" @click="closeMobileMenu"></div>
		</Transition>

		<!-- Mobile Menu Drawer -->
		<Transition enter-active-class="transition ease-in-out duration-300 transform"
			enter-from-class="-translate-x-full" enter-to-class="translate-x-0"
			leave-active-class="transition ease-in-out duration-300 transform" leave-from-class="translate-x-0"
			leave-to-class="-translate-x-full">
			<div v-if="mobileMenuOpen"
				class="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto">
				<!-- Mobile Menu Header -->
				<div class="flex items-center justify-between p-4 border-b border-gray-200 bg-brand">
					<NuxtLink to="/" @click="closeMobileMenu">
						<img src="/logo.jpg" alt="TanXLM" class="h-8" />
					</NuxtLink>
					<button @click="closeMobileMenu" class="p-2 text-white hover:bg-white/10 rounded-md">
						<X class="w-6 h-6" />
					</button>
				</div>

				<!-- Mobile Menu Navigation -->
				<nav class="p-4">
					<div v-for="item in navItems" :key="item.name" class="border-b border-gray-100 last:border-0">
						<!-- Nav Item with Children -->
						<div v-if="item.children">
							<button @click="toggleMobileSubmenu(item.name)"
								class="flex items-center justify-between w-full py-3 text-brand font-medium">
								{{ item.name }}
								<ChevronDown :class="[
									'w-5 h-5 transition-transform',
									mobileActiveSubmenu === item.name ? 'rotate-180' : ''
								]" />
							</button>
							<!-- Submenu -->
							<Transition enter-active-class="transition ease-out duration-200"
								enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-screen"
								leave-active-class="transition ease-in duration-150"
								leave-from-class="opacity-100 max-h-screen" leave-to-class="opacity-0 max-h-0">
								<div v-if="mobileActiveSubmenu === item.name" class="overflow-hidden">
									<div v-for="child in item.children" :key="child.name" class="pl-4">
										<!-- Subcategory with nested children -->
										<div v-if="child.children">
											<button @click="toggleMobileNestedSubmenu(child.name)"
												class="flex items-center justify-between w-full py-2 text-gray-700 text-sm">
												{{ child.name }}
												<ChevronDown :class="[
													'w-4 h-4 transition-transform',
													mobileActiveNestedSubmenu === child.name ? 'rotate-180' : ''
												]" />
											</button>
											<Transition enter-active-class="transition ease-out duration-150"
												enter-from-class="opacity-0" enter-to-class="opacity-100"
												leave-active-class="transition ease-in duration-100"
												leave-from-class="opacity-100" leave-to-class="opacity-0">
												<div v-if="mobileActiveNestedSubmenu === child.name" class="pl-4 pb-2">
													<NuxtLink v-for="nested in child.children" :key="nested.name"
														:to="nested.href" @click="closeMobileMenu"
														class="block py-1.5 text-gray-600 text-sm hover:text-brand">
														{{ nested.name }}
													</NuxtLink>
												</div>
											</Transition>
										</div>
										<!-- Subcategory without children -->
										<NuxtLink v-else :to="child.href" @click="closeMobileMenu"
											class="block py-2 text-gray-700 text-sm hover:text-brand">
											{{ child.name }}
										</NuxtLink>
									</div>
								</div>
							</Transition>
						</div>
						<!-- Nav Item without Children -->
						<NuxtLink v-else :to="item.href" @click="closeMobileMenu"
							class="block py-3 text-brand font-medium">
							{{ item.name }}
						</NuxtLink>
					</div>
				</nav>

				<!-- Mobile Menu Footer - Contact Info -->
				<div class="border-t border-gray-200 bg-gray-50 p-4">
					<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Need Help?</p>
					<NuxtLink to="/contact" @click="closeMobileMenu"
						class="flex items-center gap-3 py-2 text-brand font-medium hover:text-brand/80 transition-colors">
						<Phone class="w-5 h-5" />
						Contact Us
					</NuxtLink>
					<a href="#"
						class="flex items-center gap-3 py-2 text-gray-700 hover:text-brand transition-colors">
						<Phone class="w-5 h-5" />
						+855 17 86 88 83
					</a>
					<div class="flex items-center gap-4 pt-3 border-t border-gray-200 mt-2">
						<a href="https://www.facebook.com/ITSolutionCam/" target="_blank" rel="noopener noreferrer" class="text-brand hover:text-brand/70">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
							</svg>
						</a>
						<a href="https://t.me/hengitsolution" target="_blank" rel="noopener noreferrer" class="text-brand hover:text-brand/70">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
								<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</Transition>

		<!-- Mega Menu Dropdown (Desktop) -->
		<Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-1"
			enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
			leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
			<div v-if="activeDropdown && activeNavItem?.children"
				class="absolute left-0 right-0 bg-gray-200 border-b border-gray-200 shadow-lg z-50 hidden lg:block"
				@mouseenter="keepDropdownOpen" @mouseleave="closeDropdown">
				<div class="mx-auto max-w-7xl px-6 py-0">
					<div class="flex">
						<!-- Left Column - Categories -->
						<div class="w-72 border-r border-gray-200 py-4">
							<!-- Subcategories -->
							<div v-for="subcat in activeNavItem.children" :key="subcat.name" class="relative"
								@mouseenter="setActiveSubcategory(subcat)" @mouseleave="clearActiveSubcategory">
								<NuxtLink :to="subcat.href" :class="[
									'flex items-center justify-between px-4 py-1 text-brand hover:bg-brand hover:text-white transition-colors',
									activeSubcategory?.name === subcat.name ? 'bg-brand text-white' : ''
								]">
									{{ subcat.name }}
									<ChevronRight v-if="subcat.children" class="w-4 h-4 text-gray-400" />
								</NuxtLink>
							</div>
						</div>

						<!-- Right Column - Subcategory Children -->
						<div v-if="activeSubcategory?.children" class="flex-1 py-3 pl-6">
							<div class="grid grid-cols-2 xl:grid-cols-3 gap-2">
								<NuxtLink v-for="child in activeSubcategory.children" :key="child.name" :to="child.href"
									class="px-3 py-1 text-brand hover:text-white hover:bg-brand rounded transition-colors">
									{{ child.name }}
								</NuxtLink>
							</div>
						</div>

						<!-- Placeholder when no subcategory is hovered -->
						<div v-else class="flex-1 py-4 pl-6 flex items-center justify-center">
							<p class="text-gray-500 text-base font-medium">Hover over a category to see more options</p>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</header>
</template>

<script setup lang="ts">
	import { ChevronDown, ChevronRight, CircleUser, LogOut, Menu, Phone, Search, ShoppingCart, X, Heart } from 'lucide-vue-next'
	import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
	import { useRoute } from 'vue-router'
	import CartDrawer from '~/components/custom/CartDrawer.vue'

	const { ItemCount: cartTotalItems } = useCart()
	const authStore = useAuthStore()
	const wishlistStore = useWishlistStore()
	const { addToast } = useToast()

	// Desktop Search
	const searchQuery = ref('')
	const showSearchDropdown = ref(false)
	const searchRef = ref<HTMLElement | null>(null)
	const { searchResults, status: searchStatus, refresh: refreshSearch } = useProductSearch(searchQuery)

	// Mobile Search
	const mobileSearchQuery = ref('')
	const showMobileSearchDropdown = ref(false)
	const mobileSearchRef = ref<HTMLElement | null>(null)
	const { searchResults: mobileSearchResults, status: mobileSearchStatus, refresh: refreshMobileSearch } = useProductSearch(mobileSearchQuery)

	// Watch desktop search query
	watch(searchQuery, async (newValue) => {
		if (newValue.length > 0) {
			await refreshSearch()
		}
	})

	// Watch mobile search query
	watch(mobileSearchQuery, async (newValue) => {
		if (newValue.length > 0) {
			await refreshMobileSearch()
		}
	})

	// Close search dropdown
	function closeSearch() {
		showSearchDropdown.value = false
		searchQuery.value = ''
	}

	// Close mobile search dropdown
	function closeMobileSearch() {
		showMobileSearchDropdown.value = false
		mobileSearchQuery.value = ''
		mobileSearchOpen.value = false
	}

	// Get user initials (first 1-2 characters)
	const userInitials = computed(() => {
		const name = authStore.user?.name || ''
		const words = name.trim().split(' ').filter(word => word.length > 0)
		const first = words[0]
		const last = words[words.length - 1]
		if (words.length >= 2 && first && last) {
			// Get first letter of first and last name
			return (first.charAt(0) + last.charAt(0)).toUpperCase()
		}
		// Get first 2 letters of single name
		return name.trim().substring(0, 2).toUpperCase() || 'U'
	})

	// User menu state (desktop)
	const userMenuOpen = ref(false)
	const userMenuRef = ref<HTMLElement | null>(null)
	let userMenuTimeout: ReturnType<typeof setTimeout> | null = null

	// Mobile profile menu ref
	const mobileProfileMenuRef = ref<HTMLElement | null>(null)

	function toggleUserMenu() {
		userMenuOpen.value = !userMenuOpen.value
	}

	function openUserMenu() {
		if (userMenuTimeout) {
			clearTimeout(userMenuTimeout)
			userMenuTimeout = null
		}
		userMenuOpen.value = true
	}

	function closeUserMenuDelayed() {
		userMenuTimeout = setTimeout(() => {
			userMenuOpen.value = false
		}, 200)
	}

	function keepUserMenuOpen() {
		if (userMenuTimeout) {
			clearTimeout(userMenuTimeout)
			userMenuTimeout = null
		}
	}

	function closeUserMenu() {
		if (userMenuTimeout) {
			clearTimeout(userMenuTimeout)
			userMenuTimeout = null
		}
		userMenuOpen.value = false
	}

	async function handleLogout() {
		try {
			await authStore.logout()
			addToast('You have been logged out successfully.', 'success')
			closeMobileMenu()
			closeProfileMenu()
			closeUserMenu()
			navigateTo('/')
		} catch (error) {
			console.error('Logout error:', error)
			addToast('An error occurred during logout.', 'error')
		}
	}

	// Click outside handler for user menus (desktop and mobile)
	function handleClickOutside(event: MouseEvent) {
		// Close desktop user menu
		if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
			closeUserMenu()
		}
		// Close mobile profile menu
		if (mobileProfileMenuRef.value && !mobileProfileMenuRef.value.contains(event.target as Node)) {
			closeProfileMenu()
		}
		// Close desktop search dropdown
		if (searchRef.value && !searchRef.value.contains(event.target as Node)) {
			showSearchDropdown.value = false
		}
		// Close mobile search dropdown
		if (mobileSearchRef.value && !mobileSearchRef.value.contains(event.target as Node)) {
			showMobileSearchDropdown.value = false
		}
	}

	// Hide header on scroll down, show on scroll up
	const hideHeader = ref(false)
	let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
	let ticking = false

	function onScroll() {
		if (typeof window === 'undefined') return;
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const currentY = window.scrollY
				if (currentY > lastScrollY && currentY > 80) {
					hideHeader.value = true
				} else {
					hideHeader.value = false
				}
				lastScrollY = currentY
				ticking = false
			})
			ticking = true
		}
	}

	onMounted(() => {
		window.addEventListener('scroll', onScroll)
		document.addEventListener('click', handleClickOutside)
	})
	onBeforeUnmount(() => {
		window.removeEventListener('scroll', onScroll)
		document.removeEventListener('click', handleClickOutside)
		document.body.style.overflow = '' // Ensure body scroll is restored
		if (userMenuTimeout) {
			clearTimeout(userMenuTimeout)
		}
	})
	import type { CategoryTree } from '~/types'

	const route = useRoute()
	const { categories } = useCategories()

	interface NavChild {
		name: string
		href: string
	}

	interface NavSubcategory {
		name: string
		href: string
		children?: NavChild[]
	}

	interface NavItem {
		name: string
		href: string
		children?: NavSubcategory[]
	}

	// Mobile menu state
	const mobileMenuOpen = ref(false)
	const mobileSearchOpen = ref(false)
	const mobileActiveSubmenu = ref<string | null>(null)
	const mobileActiveNestedSubmenu = ref<string | null>(null)

	// Profile menu state
	const profileMenuOpen = ref(false)

	function toggleMobileMenu() {
		mobileMenuOpen.value = !mobileMenuOpen.value
		if (mobileMenuOpen.value) {
			profileMenuOpen.value = false // Close profile menu if open
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
			mobileActiveSubmenu.value = null
			mobileActiveNestedSubmenu.value = null
		}
	}

	function closeMobileMenu() {
		mobileMenuOpen.value = false
		document.body.style.overflow = ''
		mobileActiveSubmenu.value = null
		mobileActiveNestedSubmenu.value = null
	}

	function toggleProfileMenu() {
		profileMenuOpen.value = !profileMenuOpen.value
	}

	function closeProfileMenu() {
		profileMenuOpen.value = false
	}

	function toggleMobileSearch() {
		mobileSearchOpen.value = !mobileSearchOpen.value
	}

	function toggleMobileSubmenu(name: string) {
		mobileActiveSubmenu.value = mobileActiveSubmenu.value === name ? null : name
		mobileActiveNestedSubmenu.value = null
	}

	function toggleMobileNestedSubmenu(name: string) {
		mobileActiveNestedSubmenu.value = mobileActiveNestedSubmenu.value === name ? null : name
	}

	// Transform a CategoryTree node's children into NavSubcategory format
	function buildNavChildren(node: CategoryTree): NavSubcategory[] {
		return node.children.map(child => ({
			name: child.name,
			href: `/categories/${child.slug}`,
			children: child.children.length
				? child.children.map(nested => ({
					name: nested.name,
					href: `/categories/${nested.slug}`,
				}))
				: undefined,
		}))
	}

	// Build navigation items from API categories tree
	const navItems = computed<NavItem[]>(() => {
		const items: NavItem[] = [
			{ name: 'Home', href: '/' },
		]

		if (categories.value) {
			for (const rootCategory of categories.value) {
				items.push({
					name: rootCategory.name,
					href: `/categories/${rootCategory.slug}`,
					children: [
						{ name: `All ${rootCategory.name}`, href: `/categories/${rootCategory.slug}` },
						...buildNavChildren(rootCategory),
					],
				})
			}
		}

		// Static nav items
		items.push({
			name: 'Services', href: '/services', children: [
				{ name: 'Services', href: '/services' },
				{ name: 'University Management System', href: '/services/university-management-system' },
				{ name: 'Scholarship Management System', href: '/services/scholarship-management-system' },
			]
		})

		return items
	})

	const activeDropdown = ref<string | null>(null)
	const activeSubcategory = ref<NavSubcategory | null>(null)
	let closeTimeout: ReturnType<typeof setTimeout> | null = null
	let openTimeout: ReturnType<typeof setTimeout> | null = null

	const activeNavItem = computed(() => {
		return navItems.value.find(item => item.name === activeDropdown.value)
	})

	function openDropdown(name: string) {
		if (closeTimeout) {
			clearTimeout(closeTimeout)
			closeTimeout = null
		}
		if (openTimeout) {
			clearTimeout(openTimeout)
			openTimeout = null
		}
		const item = navItems.value.find(i => i.name === name)
		if (item?.children) {
			openTimeout = setTimeout(() => {
				activeDropdown.value = name
				activeSubcategory.value = null
			}, 300)
		}
	}

	function closeDropdown() {
		if (openTimeout) {
			clearTimeout(openTimeout)
			openTimeout = null
		}
		closeTimeout = setTimeout(() => {
			activeDropdown.value = null
			activeSubcategory.value = null
		}, 150)
	}

	function keepDropdownOpen() {
		if (closeTimeout) {
			clearTimeout(closeTimeout)
			closeTimeout = null
		}
	}

	function setActiveSubcategory(subcat: NavSubcategory) {
		activeSubcategory.value = subcat
	}

	function clearActiveSubcategory() {
		// Keep the subcategory visible for better UX
	}

	// Close dropdown and menus when route changes
	watch(() => route.fullPath, () => {
		activeDropdown.value = null
		activeSubcategory.value = null
		closeMobileMenu()
		closeProfileMenu()
		closeUserMenu()
	})

	// Initialize wishlist when user is authenticated
	watch(() => authStore.isAuthenticated, (isAuthenticated) => {
		if (isAuthenticated) {
			wishlistStore.initializeWishlist()
		} else {
			wishlistStore.clearWishlist()
		}
	}, { immediate: true })
</script>