import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { LocalService } from 'src/app/services/local.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ChatComponent implements OnInit {
  @ViewChild('logoutConfirmation', { static: true, read: TemplateRef })
  logoutConfirmation: TemplateRef<any> | undefined;
  @ViewChild('confirm', { static: true, read: TemplateRef })
  confirm: TemplateRef<any> | any;
  @ViewChild('conversationSort') conversationSort = new MatSort();
  constructor(
    private local: LocalService,
    private modal: ModalService,
    private viewContainerRef: ViewContainerRef,
    private router: Router
  ) {
    this.catchTForm = new FormGroup({
      option: new FormControl(''),
      reply: new FormControl(''),
    });
  }
  intentName: string = '';
  active: boolean = true;
  summary: boolean = false;
  intentMain: boolean = false;
  trainBot: boolean = false;
  catchAll: boolean = false;
  tabHeading: string = '';
  tabSubHeading: string = '';

  //FORMs
  catchTForm: FormGroup;

  foods: any = [{ viewValue: 'Human HandOff' }, { viewValue: 'Add reply' }];
  chatIntentArray: any = [];
  dataSource: any = ELEMENT_DATA;
  columnsToDisplay = ['name'];
  expandedElement: any;
  bodyLoader: boolean = false;

  ngOnInit(): void {
    this.tableData = new MatTableDataSource(this.tableData);
    this.searchFilterTable();
    this.dataSource = new MatTableDataSource(this.dataSource);
    this.searchFilterTableByIntent();
  }

  logout() {
    this.local.clearData();
    this.router.navigate(['/login']);
  }
  intentatadisplayedColumns: string[] = [
    'Intent',
    'Messages',
    'Importance',
    'Accuracy',
    'CatchAll',
  ];

  tableData: any = [
    {
      intent: 'Greetings',
      msg: 102,
      imp: 50,
      accuracy: 1.2,
      catch: 10,
    },
    {
      intent: 'Bye',
      msg: 16,
      imp: 50,
      accuracy: 1.2,
      catch: 10,
    },
    {
      intent: 'Location',
      msg: 16,
      imp: 58,
      accuracy: 6.2,
      catch: 90,
    },
  ];

  applyFilter(filterValue: any) {
    filterValue = filterValue?.target?.value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  searchFilterTable() {
    this.tableData.filterPredicate = function (
      data: any,
      filter: string
    ): boolean {
      console.log(data?.intent);
      return data?.intent?.toLowerCase()?.includes(filter.toLowerCase());
    };
  }

  applyFilterToIntent(filterValue: any) {
    filterValue = filterValue?.target?.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchFilterTableByIntent() {
    this.dataSource.filterPredicate = function (
      data: any,
      filter: string
    ): boolean {
      return data?.name?.toLowerCase()?.includes(filter.toLowerCase());
    };
  }
  summaryTab() {
    this.bodyLoader = true;
    setTimeout(() => {
      this.bodyLoader = false;
      this.summary = true;
      this.intentMain = false;
      this.catchAll = false;
      this.trainBot = false;

      this.tabHeading = 'Summary';
      this.tabSubHeading =
        'Discover which intents are most regularly queried and gain a deeper understanding into the interests of your user.';
    }, 900);
  }

  catchAllTab() {
    this.bodyLoader = true;
    setTimeout(() => {
      this.bodyLoader = false;
      this.summary = false;
      this.intentMain = false;
      this.catchAll = true;
      this.trainBot = false;

      this.tabHeading = 'Catch All';
      this.tabSubHeading =
        'When Instinct Ai fails to understand user utterance, you can choice one of the option to manage the bot failure without degrading user experience.';
    }, 900);
  }

  intentTab() {
    this.bodyLoader = true;
    setTimeout(() => {
      this.bodyLoader = false;
      this.summary = false;
      this.intentMain = true;
      this.catchAll = false;
      this.trainBot = false;
      this.tabHeading = 'Intents';
      this.tabSubHeading =
        'Browse through existing intents that were created earlier and improve coverage by adding more variations.';
    }, 900);
  }
  trainBotTab() {
    this.bodyLoader = true;
    setTimeout(() => {
      this.bodyLoader = false;
      this.summary = false;
      this.intentMain = false;
      this.catchAll = false;
      this.trainBot = true;

      this.tabHeading = 'Add a new utterance';
      this.tabSubHeading =
        'Create and intent and add a multiple utterances to let Ai answers automatically';
    }, 900);
  }

  addIntent() {}
  openIntentModal() {
    this.intentName = '';
    let data = {
      title: 'Add Intent',
      contentTpl: this.confirm,
    };
    this.openDialog(data);
  }
  addIntentToIntentArray() {
    if (this.intentName != '') {
      ELEMENT_DATA[0]?.type.push(this.intentName);
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      console.log(this.dataSource);
    }

    this.modal.removeDynamicComponent();
  }
  addReply() {
    console.log(this.catchTForm.value);
    this.chatIntentArray.push(this.catchTForm.value);
    console.log(this.chatIntentArray);
  }

  openDialog(error: any) {
    console.log(error);
    if (error) {
      this.modal.setRootViewContainerRef(this.viewContainerRef);
      this.modal.addDynamicComponent(error);
    }
  }
}

export interface PeriodicElement {
  name: string;
  type: [];
}

const ELEMENT_DATA: any = [
  {
    name: 'Greetings',
    type: [],
  },
  {
    name: 'Bye',
    type: [],
  },
];
