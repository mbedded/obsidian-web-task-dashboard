import { ItemView, WorkspaceLeaf } from 'obsidian';

// Import the MainView Svelte component and the `mount` and `unmount` methods.
import MainView from './MainView.svelte';
import { mount, unmount } from 'svelte';
import type { ITodoAdapter } from "../adapters/ITodoAdapter";

// todo: change variable/value
export const VIEW_TYPE_EXAMPLE = 'example-views';

export class MainViewModel extends ItemView {
  private readonly todoAdapter: ITodoAdapter;

	// A variable to hold on to the MainView instance mounted in this ItemView.
	mainView: ReturnType<typeof MainView> | undefined;

	constructor(leaf: WorkspaceLeaf, todoAdapter: ITodoAdapter) {
		super(leaf);
    this.todoAdapter = todoAdapter;
  }

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
    // todo: verify name. Localization? Read name from manifest?
		return 'Tracks Plugin';
	}

	async onOpen() {
		// Attach the Svelte component to the ItemViews content element and provide the needed props.
		this.mainView = mount(MainView, {
			target: this.contentEl,
			props: {
        adapter: this.todoAdapter,
			}
		});

    await this.mainView.initializeView();
	}

	async onClose() {
		if (this.mainView) {
			// Remove the MainView from the ItemView.
			await unmount(this.mainView);
		}
	}
}
