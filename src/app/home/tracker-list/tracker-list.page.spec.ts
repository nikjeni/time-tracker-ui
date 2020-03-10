import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackerListPage } from './tracker-list.page';

describe('TrackerListPage', () => {
  let component: TrackerListPage;
  let fixture: ComponentFixture<TrackerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
